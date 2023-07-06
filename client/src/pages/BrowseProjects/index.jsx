import React, { useState, useEffect } from 'react'
import { insertProject, getProject } from '@/services'
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
  message,
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
} from './Styles'
const { Sider, Content } = Layout
const { Search } = Input
const { Option } = Select
const CustomOverlay = (record) => (
  <PersonInfo>
    <img src="https://via.placeholder.com/40" alt="placeholder" />
    <PersonText>
      <span>{record.managerName}</span>
      <p>{record.managerEmail}</p>
    </PersonText>
  </PersonInfo>
)

const columns = [
  {
    title: 'ProjectName',
    dataIndex: 'projectName',
    key: 'projectName',
    render: (_, record) => (
      <ProjectLink to={`/project/${record.key}/board`} target="_blank">
        {record.projectName}
      </ProjectLink>
    ),
  },
  {
    title: 'ProjectType',
    //通过这一项来匹配表格字段
    dataIndex: 'projectType',
    key: 'projectType',
  },
  {
    title: 'managerName',
    dataIndex: 'managerName',
    key: 'managerName',
    render: (_, record) => (
      <Tooltip title="prompt text" overlay={CustomOverlay(record)}>
        <div>
          <span>{record.managerName}</span>
        </div>
      </Tooltip>
    ),
  },
]

export default function BrowseProjects() {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
  const [createOpen, setCreateOpen] = useState(false)
  const [searchType, setSearchType] = useState('software')
  const init = () => {
    getProject().then((res) => {
      console.log('/', res)
      setData(res)
    })
  }
  useEffect(() => {
    init()
  }, [])

  // 动态计算样式名
  const onSearch = (value) => {
    //获取输入的值来搜素
    console.log(value)
  }

  const onFinish = (values) => {
    values.managerEmail = Object.keys(values.managerEmail)
      .map((k) => values.managerEmail[k])
      .join('')
    insertProject(values).then((res) => {
      setCreateOpen(false)
      // init()
    })
  }
  const onFinishFailed = () => {}
  return (
    <Layout>
      <Sider width="250" style={siderStyle}>
        <h3>Browse project</h3>
        <Divider />
        <ProjectType>
          <h4>All project types</h4>
          <Type autoFocus onClick={() => setSearchType('software')} software>
            <BuildOutlined className="icon" />
            <span>software</span>
          </Type>
          <Type onClick={() => setSearchType('business')}>
            <PicRightOutlined className="icon" />
            <TypeLabel>business</TypeLabel>
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
          <Table columns={columns} dataSource={data} />
          <Modal width={500} open={createOpen} footer={null} onCancel={() => setCreateOpen(false)}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ fontFamily: ' CircularStdBook' }}
              layout="vertical"
              form={form}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
            >
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: 'Please input your projectName!' }]}
              >
                <Input placeholder="input projectName" />
              </Form.Item>
              <Form.Item
                label="Project Type"
                name="projectType"
                rules={[{ required: true, message: 'Please select your type!' }]}
              >
                <Select
                  options={[
                    {
                      value: 'software',
                      label: 'Software',
                    },
                    {
                      value: 'business',
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
              <Form.Item label="Manager Email">
                <Space.Compact>
                  <Form.Item name={['managerEmail', 'content']} noStyle>
                    <Input
                      style={{
                        width: '330px',
                      }}
                      placeholder="Input street"
                    />
                  </Form.Item>
                  <Form.Item name={['managerEmail', 'suffix']} noStyle>
                    <Select
                      style={{
                        width: '40%',
                      }}
                    >
                      <Select.Option value="@gmail.com">@gmail.com</Select.Option>
                      <Select.Option value="@hotmail.com">@hotmail.com</Select.Option>
                      <Select.Option value="@outlook.com">@outlook.com</Select.Option>
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
              <Button style={{ marginLeft: '300px' }} onClick={() => setCreateOpen(false)}>
                取消
              </Button>
              <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">
                确定
              </Button>
            </Form>
          </Modal>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  )
}
