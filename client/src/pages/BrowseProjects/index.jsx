import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Layout, Divider, Table, Tooltip } from 'antd'
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
const columns = [
  {
    title: 'ProjectName',
    dataIndex: 'projectName',
    key: 'projectName',
    render: (_, record) => (
      <ProjectLink to={`/project/${record.key}/board`}>{record.name}</ProjectLink>
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
export default function BrowseProjects() {
  const [isActive, setIsActive] = useState(false)

  // 动态计算样式名
  const className = isActive ? 'active' : ''
  const navigate = useNavigate()
  const onSearch = (value) => {
    //获取输入的值来搜素
    console.log(value)
  }
  const jumpToProject = () => {
    //根据搜索结果显示出的item来选择
    navigate('/project/001/board', {
      replace: false,
      // state: {
      //   id: m.id,
      //   title: m.title,
      // },
    })
  }
  const choosed = () => {
    setIsActive(true)
  }
  // 写个nav包含项目类型（software和business) 选择nav时选择框的上方要显示不同的内容下的搜索
  return (
    <Layout>
      <Sider width="250" style={siderStyle}>
        <h3>Browse project</h3>
        <Divider />
        <ProjectType>
          <h4>All project types</h4>
          <Type className={className} software onClick={choosed}>
            <BuildOutlined className="icon" />
            <span>software</span>
          </Type>
          <Type className={className} onClick={choosed}>
            <PicRightOutlined className="icon" />
            <TypeLabel>business</TypeLabel>
          </Type>
        </ProjectType>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <h3>business - All project types</h3>
          <Search
            style={{ width: '260px', margin: '20px 0' }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
          <Table columns={columns} dataSource={data} />;
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  )
}
