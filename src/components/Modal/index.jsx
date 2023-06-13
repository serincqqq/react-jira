import React, { Fragment, useState, useRef, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Drawer, Modal, Select, Form, Input, Space, Spin } from 'antd'
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleFilled, CheckSquareFilled } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import { SectionTitle, SearchInput, SearchInputDebounced } from './Styles'
import Issue from '../Issue'

const { Option } = Select
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
  return <Select labelInValue filterOption={false} onSearch={debounceFetcher} notFoundContent={fetching ? <Spin size="small" /> : null} {...props} options={options} />
}
async function fetchUserList(username) {
  //console.log('fetching user', username)
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }))
    )
}
function NavbarModal() {
  const [form] = Form.useForm()
  const [searchOpen, setSearchOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [value, setValue] = useState([])
  const [description] = useState('')

  const submit = () => {
    console.log('yes', form.getFieldsValue())
  }
  const onClose = () => {
    setSearchOpen(false)
    setCreateOpen(false)
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
      <Drawer style={{ width: '520px' }} placement="left" closable={false} onClose={onClose} open={searchOpen}>
        <SearchInput>
          <SearchOutlined style={{ fontSize: '22px', marginTop: '2px' }} />
          <SearchInputDebounced placeholder="Search issues by summary, description..."></SearchInputDebounced>
        </SearchInput>
        <SectionTitle>Recent Issues</SectionTitle>
        <Issue></Issue>
      </Drawer>
      <Modal width={670} open={createOpen} onOk={submit} onCancel={onClose} okText="Create Issue" cancelText="Cancel">
        <Form style={{ fontFamily: ' CircularStdBook' }} layout="vertical" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 30 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} autoComplete="off">
          <Form.Item label="Project" name="project" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="choose project" />
          </Form.Item>
          <Form.Item initialValue="Task" label="Issue Type" name="issuetype" rules={[{ required: true, message: 'Please input your username!' }]}>
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
            <ReactQuill style={{ width: 600 }} theme="snow" value={description} onChange={setValue} />
          </Form.Item>
          <Form.Item initialValue="Medium" label="Priority" name="priority" rules={[{ required: true, message: 'Please input your username!' }]}>
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
          <Form.Item label="Reporter" name="reporter" rules={[{ required: true, message: 'Please input your username!' }]}>
            {/* 将来要做成带搜索框的数据，而且数据要从接口获取 */}
            <DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Select users"
              fetchOptions={fetchUserList}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item label="Assignees" name="assignees" rules={[{ required: true, message: 'Please input your username!' }]}>
            {/* 将来要做成带搜索框的数据，而且数据要从接口获取 */}
            <DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Select users"
              fetchOptions={fetchUserList}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

// Modal.propTypes = propTypes;
// Modal.defaultProps = defaultProps;

export default NavbarModal
