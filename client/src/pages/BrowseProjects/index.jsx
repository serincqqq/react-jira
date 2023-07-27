import React, { useState, useEffect } from 'react'
import { insertProject, getProject, searchProject, getSuffixOption, deleteProject } from '@/services'
import {
  Input,
  Layout,
  Divider,
  Table,
  Tooltip,
  Button,
  Modal,
  Form,
  Upload,
  Select,
  Space,
} from 'antd'
import { PicRightOutlined, BuildOutlined, UploadOutlined } from '@ant-design/icons'
import {
  TypeLabel,
  siderStyle,
  ProjectType,
  contentStyle,
  Type,
  ProjectLink,
  PersonInfo,
  PersonText,
  softIcon,
  businessIcon,
} from './Styles'
const { Sider, Content } = Layout
const { Search } = Input
const { Option } = Select


export default function BrowseProjects() {
  const CustomOverlay = (record) => (
    <PersonInfo>
      <img src="https://via.placeholder.com/40" alt="placeholder" />
      <PersonText>
        <span>{record.managerName}</span>
        <p>{record.managerEmail}</p>
      </PersonText>
    </PersonInfo>
  )
  const deleteAction=(record)=>{
    deleteProject(record._id).then((res)=>{
      if(res.code===0) init()
    })
  }
  const columns = [
    {
      title: 'ProjectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (_, record) => (
        <ProjectLink to={`/project/${record._id}/board`} target="_blank">
          {record.projectName}
        </ProjectLink>
      ),
    },
    {
      title: 'keyword',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: 'ProjectType',
      //通过这一项来匹配表格字段
      dataIndex: 'projectType',
      key: 'projectType',
      render: (_, record) => (
        <div>
          {record.projectType === 'Software' ? (
            <BuildOutlined style={softIcon} />
          ) : (
            <PicRightOutlined style={businessIcon} />
          )}
          <span>{record.projectType}</span>
        </div>
      ),
    },
    {
      title: 'managerName',
      dataIndex: 'managerName',
      key: 'managerName',
      render: (_, record) => (
        <Tooltip placement="bottomLeft" overlay={CustomOverlay(record)}>
          <div>
            <span>{record.managerName}</span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
           <Button type="link" onClick={()=>deleteAction(record)}>Delete</Button>
        </Space>
      ),
    },
  ]
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
  const [createOpen, setCreateOpen] = useState(false)
  const [searchType, setSearchType] = useState('Software')
  const [suffixOption, setSuffixOption] = useState([])
  const init = () => {
    getProject().then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    getSuffixOption().then((res) => {
      setSuffixOption(res.data)
    })
    init()
  }, [])


  // 动态计算样式名
  const onSearch = (value) => {
    searchProject(value, searchType).then((res) => {
      setData(res.data)
    })
  }

  const onFinish = (values) => {
    values.managerEmail = Object.keys(values.managerEmail)
      .map((k) => values.managerEmail[k])
      .join('')
    insertProject(values).then((res) => {
      setCreateOpen(false)
      form.resetFields()
      init()
    })
  }
  const cancel = () => {
    setCreateOpen(false)
    form.resetFields()
  }
  return (
    <Layout>
      <Sider width="250" style={siderStyle}>
        <h3>Browse project</h3>
        <Divider />
        <ProjectType>
          <h4>All project types</h4>
          {/* 不能用foucus，一旦失去焦点又没颜色了 */}
          <Type autoFocus onClick={() => setSearchType('Software')} software>
            <BuildOutlined className="icon" />
            <span>Software</span>
          </Type>
          <Type onClick={() => setSearchType('Business')}>
            <PicRightOutlined className="icon" />
            <TypeLabel>Business</TypeLabel>
          </Type>
        </ProjectType>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <h3>{searchType} - All project types</h3>

          <Search
            style={{ width: '260px', margin: '20px 0' }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
          <Button
            onClick={() => setCreateOpen(true)}
            style={{ float: 'right', marginRight: '100px' }}
            type="primary"
          >
            create project
          </Button>
          <Table columns={columns} dataSource={data} rowKey="_id" />
          <Modal width={500} open={createOpen} footer={null} onCancel={() => setCreateOpen(false)}>
            <Form
              onFinish={onFinish}
              style={{ fontFamily: ' CircularStdBook' }}
              layout="vertical"
              form={form}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
              initialValues={{ projectType: 'Software', managerEmail: { suffix: '@gmail.com' } }}
            >
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: 'Please input your projectName!' }]}
              >
                <Input placeholder="input projectName" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input placeholder="input description" />
              </Form.Item>
              <Form.Item
                label="Project Type"
                name="projectType"
                rules={[{ required: true, message: 'Please select your type!' }]}
              >
                <Select
                  options={[
                    {
                      value: 'Software',
                      label: 'Software',
                    },
                    {
                      value: 'Business',
                      label: 'Business',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Manager Name"
                name="managerName"
                rules={[{ required: true, message: 'Please input your managerName!' }]}
              >
                <Input placeholder="input managerName" />
              </Form.Item>

              <Form.Item label="Manager Email" style={{ marginBottom: 0 }}>
                <Space.Compact>
                  <Form.Item
                    name={['managerEmail', 'content']}
                    style={{ width: '300px' }}
                    rules={[{ required: true, message: 'content is required' }]}
                  >
                    <Input placeholder="Input street" />
                  </Form.Item>
                  <Form.Item
                    name={['managerEmail', 'suffix']}
                    style={{ width: '150px' }}
                    rules={[{ required: true, message: 'suffix is required' }]}
                  >
                    <Select>
                      {suffixOption.map((item) => (
                        <Option key={item._id} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space.Compact>
              </Form.Item>

              <Form.Item label="Manager Avatar" name="managerAvatar">
                <Upload fileList={fileList} maxCount={1} action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="KeyWord" name="keyword">
                <Input placeholder="input keyword" />
              </Form.Item>
              <Button style={{ marginLeft: '260px' }} onClick={cancel}>
                Cancel
              </Button>
              <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">
                Submit
              </Button>
            </Form>
          </Modal>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  )
}
