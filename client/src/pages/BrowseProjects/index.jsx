import React, { useState, useEffect } from 'react'
import { getProject, searchProject, deleteProject } from '@/services'
import PubSub from 'pubsub-js'
import i18n from 'i18next'
import { Input, Layout, Divider, Table, Tooltip, Button, Space, Menu, message } from 'antd'
import { PicRightOutlined, BuildOutlined } from '@ant-design/icons'
import NavbarLeft from '@/components/NavbarLeft'
import {
  siderStyle,
  ProjectType,
  contentStyle,
  ProjectLink,
  PersonInfo,
  PersonText,
  softIcon,
  businessIcon,
} from './Styles'
import CreateProject from './components/CreateProject'
import { useTranslation } from 'react-i18next'
const { Sider, Content } = Layout
const { Search } = Input

export default function BrowseProjects() {
  const columns = [
    {
      title: 'ProjectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (_, record) => (
        <ProjectLink to={`/project/${record._id}/myIssue`} target="_blank">
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
          <Button type="link" danger onClick={() => deleteAction(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [createOpen, setCreateOpen] = useState(false)
  const [searchType, setSearchType] = useState('Software')
  const CustomOverlay = (record) => (
    <PersonInfo>
      <img src="https://via.placeholder.com/40" alt="placeholder" />
      <PersonText>
        <span>{record.managerName}</span>
        <p>{record.managerEmail}</p>
      </PersonText>
    </PersonInfo>
  )
  const deleteAction = (record) => {
    deleteProject(record._id).then((res) => {
      if (res.code === 0) {
        message.success('Deleted successfully!')
        init()
      }
    })
  }

  const init = () => {
    getProject().then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    PubSub.subscribe('refreshProject', (_) => {
      setCreateOpen(false)
      message.success('Created successfully!')
      init()
    })
    PubSub.subscribe('closeModal', (_) => {
      setCreateOpen(false)
    })
    PubSub.subscribe('openModal', (_) => {
      setCreateOpen(true)
    })

    init()
  }, [])

  const onSearch = (value) => {
    searchProject(value, searchType).then((res) => {
      setData(res.data)
    })
  }
  const changeLanguage = (val) => {
    i18n.changeLanguage(val) // val入参值为'en'或'zh'
  }
  return (
    <>
      <NavbarLeft></NavbarLeft>
      <Layout>
        {/* <Button>click</Button> */}
        <Sider width="250" style={siderStyle}>
          {/* <h3>Browse project</h3> */}
          <h3>{t('header.home')}</h3>
          <Divider />
          <ProjectType>
            <h4>All project types</h4>
            <Menu
              onClick={(e) => setSearchType(e.key)}
              style={{ background: 'rgb(244, 245, 247)', border: 'none' }}
              defaultSelectedKeys={['Software']}
              items={[
                {
                  key: 'Software',
                  icon: <BuildOutlined className="icon" />,
                  label: 'Software',
                },
                {
                  key: 'Business',
                  icon: <PicRightOutlined className="icon" />,
                  label: 'Business',
                },
              ]}
            />
          </ProjectType>
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
            background: 'white',
          }}
        >
          <Content style={contentStyle}>
            <h3>{searchType} - All project types</h3>
            <Button onClick={() => changeLanguage('en')}>click</Button>
            <Search
              style={{ width: '260px', margin: '20px 0' }}
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
            <Table columns={columns} dataSource={data} rowKey="_id" />
            <CreateProject createOpen={createOpen}></CreateProject>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
