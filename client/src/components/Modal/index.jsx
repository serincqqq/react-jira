import React, { Fragment, useState, useRef, useMemo, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { nanoid } from 'nanoid'
// import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Drawer, Modal, Select, Form, Input, Space, Spin, Button } from 'antd'
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ExclamationCircleFilled,
  CheckSquareFilled,
} from '@ant-design/icons'
import PubSub from 'pubsub-js'
import { SectionTitle, SearchInput, SearchInputDebounced } from './Styles'
import Issue from '../Issue'
import { getIssueList, getUserList, insertIssue } from '@/services'

const { Option } = Select
//抽成常量存在一个文件
const prioritys = [
  {
    icon: <ArrowUpOutlined style={{ color: '#CD1317' }} />,
    label: 'Highest',
  },
  {
    icon: <ArrowUpOutlined style={{ color: '#E9494A' }} />,
    label: 'High',
  },
  {
    icon: <ArrowUpOutlined style={{ color: '#E97F33' }} />,
    label: 'Medium',
  },
  {
    icon: <ArrowDownOutlined style={{ color: '#2D8738' }} />,
    label: 'Low',
  },
  {
    icon: <ArrowDownOutlined style={{ color: '#57A55A' }} />,
    label: 'Lowest',
  },
]
const issueType = [
  {
    icon: <CheckSquareFilled style={{ color: '#4FADE6' }} />,
    label: 'Task',
  },
  {
    icon: <ExclamationCircleFilled style={{ color: '#E44D42' }} />,
    label: 'Bug',
  },
]
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
async function fetchReporterList(username) {
  return getUserList(username).then((res) =>
    res.map((user) => ({
      label: user.userName,
      value: user._id,
    }))
  )
}
async function fetchAssigneeList(username) {
  console.log('fetching user', username)
  return getUserList(username).then((res) =>
    res.map((user) => ({
      label: user.userName,
      value: user._id,
    }))
  )
}
function NavbarModal() {
  const [form] = Form.useForm()
  const [searchOpen, setSearchOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [value, setValue] = useState([])
  const [reporter] = useState({})
  const [assignee] = useState({})
  const [description] = useState('')
  const init = () => {
    getIssueList().then((res) => {})
  }
  useEffect(() => {
    init()
  }, [])

  const onClose = () => {
    setSearchOpen(false)
    setCreateOpen(false)
  }
  const onFinish = (values) => {
    //创建成功后正常来说要刷新问题列表，但是鉴于接口还没写完。。。默认放在未完成的列表中
    console.log('dd', values)
    insertIssue({ ...values, status: 'backlog', createdAt: new Date() }).then((res) => {
      onClose()
      form.resetFields()
      // init()
    })
  }

  PubSub.subscribe('modalType', (_, modalType) => {
    if (modalType.modal === 'modal_search') setSearchOpen(true)
    else setCreateOpen(true)
  })
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Fragment>
      <Drawer
        style={{ width: '520px' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={searchOpen}
      >
        <SearchInput>
          <SearchOutlined style={{ fontSize: '22px', marginTop: '2px' }} />
          <SearchInputDebounced placeholder="Search issues by summary, description..."></SearchInputDebounced>
        </SearchInput>
        <SectionTitle>Recent Issues</SectionTitle>
        <Issue></Issue>
      </Drawer>
      <Modal width={670} open={createOpen} onCancel={onClose} footer={null}>
        <Form
          onFinish={onFinish}
          style={{ fontFamily: ' CircularStdBook', maxWidth: 600 }}
          layout="vertical"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 30 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Issue Name"
            name="issuename"
            rules={[{ required: true, message: 'Please input your issuename!' }]}
          >
            <Input placeholder="choose project" />
          </Form.Item>
          <Form.Item
            initialValue="Task"
            label="Issue Type"
            name="issuetype"
            rules={[{ required: true, message: 'Please select your issuetype!' }]}
          >
            {/* 这里也复用一下之前写的select */}
            <Select optionLabelProp="label" onChange={handleChange}>
              {issueType.map((item) => {
                return (
                  <Option
                    key={nanoid()}
                    value={item.label}
                    label={
                      <Space>
                        {item.icon}
                        {item.label}
                      </Space>
                    }
                  >
                    <Space>
                      {item.icon}
                      {item.label}
                    </Space>
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Short Summary" name="summary">
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
            initialValue="Medium"
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select your priority!' }]}
          >
            <Select optionLabelProp="label" onChange={handleChange}>
              {prioritys.map((item) => {
                return (
                  <Option
                    key={nanoid()}
                    value={item.label}
                    label={
                      <Space>
                        {item.icon}
                        {item.label}
                      </Space>
                    }
                  >
                    <Space>
                      {item.icon}
                      {item.label}
                    </Space>
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Reporter"
            name="reporter"
            rules={[{ required: true, message: 'Please input your reporter!' }]}
          >
            {/* 将来要做成带搜索框的数据，而且数据要从接口获取 */}
            <DebounceSelect
              value={reporter}
              placeholder="Select users"
              fetchOptions={fetchReporterList}
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
            {/* 将来要做成带搜索框的数据，而且数据要从接口获取 */}
            <DebounceSelect
              value={assignee}
              placeholder="Select users"
              fetchOptions={fetchAssigneeList}
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
