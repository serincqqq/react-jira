import React, { Fragment, useState, useRef, useMemo, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Drawer, Modal, Select, Form, Input, Spin, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import noResult from '@/assets/img/noresult.png'
// ArrowUpOutlined,
// ArrowDownOutlined,
// ExclamationCircleFilled,
// CheckSquareFilled,
import PubSub from 'pubsub-js'
import './style.css'
import { SectionTitle, SearchInput, SearchInputDebounced, NoResult } from './Styles'
import Issue from '../Issue'
import { getRecIssue, getUserList, insertIssue, searchIssue } from '@/services'
import SpaceOption from '../SpaceOption'
import { issueType, prioritys } from './projectOption'
//抽成常量存在一个文件

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchRef = useRef(0)
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        setOptions(newOptions)
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Select
      labelInValue
      filterOption={false}
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
}
//可以抽成一个公共方法
async function fetchUser(username) {
  return getUserList(username).then((res) =>
    res.map((user) => ({
      label: user.userName,
      value: user._id,
    }))
  )
}

function NavbarModal() {
  const [form] = Form.useForm()
  const [searchResultText, setSearchResultText] = useState('Recent Issues')
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [value, setValue] = useState([])
  const [loading, setLoading] = useState(false)
  const [recIsssues, setRecIsssues] = useState([])
  const [reporter] = useState({})
  const [assignee] = useState({})
  const [description] = useState('')
  const init = () => {
    setSearchInput('')
    setSearchResultText('Recent Issues')
    getRecIssue().then((res) => {
      setRecIsssues(res)
    })
  }
  useEffect(() => {
    if (searchInput !== '') {
      setLoading(true)
      const timer = setTimeout(() => {
        searchIssue(searchInput).then((res) => {
          if (res.code === 0) {
            setLoading(false)
            if (res.data.length === 0) {
              setSearchResultText('')
            } else {
              setSearchResultText('MATCHING ISSUES')
            }
            setRecIsssues(res.data)
          }
        })
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [searchInput])

  useEffect(() => {
    //订阅消息如果不放在生命周期钩子中就会调用多次
    PubSub.subscribe('refresh', (_) => {
      init()
    })
    init()
  }, [])
  const handleInputChange = useCallback((event) => {
    const input = event.target.value
    setSearchInput(input)
  }, [])
  const onClose = () => {
    setSearchOpen(false)
    setCreateOpen(false)
    init()
  }
  const onFinish = (values) => {
    insertIssue({
      ...values,
      priority: {
        label: values.priority,
        key: values.priority,
      },
      status: {
        label: 'backlog',
        key: 'backlog',
      },
      createdAt: new Date(),
    }).then((res) => {
      onClose()
      form.resetFields()
      PubSub.publish('refresh')
    })
  }

  PubSub.subscribe('modalType', (_, modalType) => {
    if (modalType.modal === 'modal_search') setSearchOpen(true)
    else setCreateOpen(true)
  })
  const issuetypeChange = (value) => {
    form.setFieldsValue({ issuetype: value })
  }
  const priorityChange = (value) => {
    form.setFieldsValue({ priority: value })
  }
  return (
    <Fragment>
      <Drawer
        style={{ width: '520px', position: 'relative' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={searchOpen}
      >
        {/* 搜索问题 */}
        <SearchInput>
          <SearchOutlined style={{ fontSize: '22px', marginTop: '2px' }} />
          <SearchInputDebounced
            onChange={handleInputChange}
            value={searchInput}
            placeholder="Search issues by summary, description..."
          ></SearchInputDebounced>
          {loading ? <Spin /> : <></>}
        </SearchInput>
        <SectionTitle>{searchResultText}</SectionTitle>
        {/* 需要判断数组长度是否为0 */}
        {recIsssues.length === 0 ? (
          <NoResult>
            <img src={noResult} alt="error" className="resImg"></img>
            <h4>We couldn't find anything matching your search</h4>
            <span>Try again with a different term.</span>
          </NoResult>
        ) : (
          ''
        )}
        {recIsssues.map((item) => (
          <Issue issue={item}></Issue>
        ))}
      </Drawer>
      <Modal width={670} open={createOpen} onCancel={onClose} footer={null}>
        <Form
          onFinish={onFinish}
          style={{ fontFamily: ' CircularStdBook', maxWidth: 600 }}
          layout="vertical"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 30 }}
          autoComplete="off"
        >
          <Form.Item
            initialValue="Task"
            label="Issue Type"
            name="issuetype"
            rules={[{ required: true, message: 'Please select your issuetype!' }]}
          >
            <SpaceOption onChange={issuetypeChange} options={issueType}></SpaceOption>
          </Form.Item>
          <Form.Item
            label="Short Summary"
            name="summary"
            rules={[{ required: true, message: 'Please input your summary!' }]}
          >
            <Input placeholder="Concisely summarize the issue in one or two sentences." />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <ReactQuill
              style={{ width: 600 }}
              theme="snow"
              value={description}
              onChange={setValue}
            />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select your priority!' }]}
          >
            <SpaceOption onChange={priorityChange} options={prioritys}></SpaceOption>
          </Form.Item>
          <Form.Item
            label="Reporter"
            name="reporter"
            rules={[{ required: true, message: 'Please input your reporter!' }]}
          >
            {/* 这个能不能抽成组件呢？ */}
            <DebounceSelect
              value={reporter}
              placeholder="Select reporter"
              fetchOptions={fetchUser}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            label="Assignee"
            name="assignee"
            rules={[{ required: true, message: 'Please input your assignee!' }]}
          >
            <DebounceSelect
              value={assignee}
              placeholder="Select assignee"
              fetchOptions={fetchUser}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Button style={{ marginLeft: '260px' }} onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </Fragment>
  )
}

// Modal.propTypes = propTypes;
// Modal.defaultProps = defaultProps;

export default NavbarModal
