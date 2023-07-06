import React, { useState } from 'react'
import { insertProject, getProject } from '@/services'
import { Input, Layout, Divider, Table, Tooltip, Button } from 'antd'
import { PicRightOutlined, BuildOutlined } from '@ant-design/icons'
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

const CustomOverlay = () => (
  <PersonInfo>
    <img src="https://via.placeholder.com/40" alt="placeholder" />
    <PersonText>
      <span>name</span>
      <p>email</p>
    </PersonText>
  </PersonInfo>
)

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]
const columns = [
  {
    title: 'ProjectName',
    dataIndex: 'projectName',
    key: 'projectName',
    render: (_, record) => (
      <ProjectLink to={`/project/${record.key}/board`} target="_blank">
        {record.name}
      </ProjectLink>
    ),
  },
  {
    title: 'ProjectType',
    //通过这一项来匹配表格字段
    dataIndex: 'age',
    key: 'projectType',
  },
  {
    title: 'ProjectManager',
    dataIndex: 'address',
    key: 'projectManager',
    render: (_, record) => (
      <Tooltip title="prompt text" overlay={CustomOverlay}>
        <div>
          <span>Tooltip will show on mouse enter.</span>
        </div>
      </Tooltip>
    ),
  },
]
export default function BrowseProjects() {
  const init = () => {
    getProject().then((res) => {
      console.log('/', res)
    })
  }

  const [searchType, setSearchType] = useState('software')
  // 动态计算样式名
  const onSearch = (value) => {
    //获取输入的值来搜素
    console.log(value)
  }
  const create = () => {
    const data = {
      projectName: 'test',
      managerName: 'jack',
      managerEmail: '123@qq.com',
      managerAvatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
      keyWord: 'HardWare',
    }
    //需要开弹窗来填写相关信息
    insertProject(data).then((res) => {
      console.log('xx', res)
      init()
    })
  }

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
          <Button onClick={create} style={{ float: 'right', marginRight: '100px' }} type="primary">
            create project
          </Button>
          <Table columns={columns} dataSource={data} />
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  )
}
