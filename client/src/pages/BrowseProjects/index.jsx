import React, { useState, useEffect, useMemo } from 'react'
import { getProject, searchProject, deleteProject } from '@/services'
import PubSub from 'pubsub-js'
import { Input, Layout, Divider, Table, Tooltip, Button, Space, Menu, message } from 'antd'
import { PicRightOutlined, BuildOutlined, LayoutOutlined } from '@ant-design/icons'
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
  const { t } = useTranslation()
  const columns = [
    {
      title: t('table.name'),
      dataIndex: 'projectName',
      key: 'projectName',
      render: (_, record) => (
        <ProjectLink to={`/project/${record._id}/myIssue`} target="_blank">
          {record.projectName}
        </ProjectLink>
      ),
    },
    {
      title: t('table.keyword'),
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: t('table.type'),
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
      title: t('table.mName'),
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
      title: t('table.action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => deleteAction(record)}>
            {t('table.delete')}
          </Button>
        </Space>
      ),
    },
  ]

  const [data, setData] = useState([])
  const [createOpen, setCreateOpen] = useState(false)
  const [searchType, setSearchType] = useState('all')
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
        message.success(t('tips.delete'))
        init()
      }
    })
  }

  const init = () => {
    getProject(searchType).then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    PubSub.subscribe('refreshProject', (_) => {
      setCreateOpen(false)
      message.success(t('tips.create'))
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
  useMemo(() => {
    init()
  }, [searchType])
  const changeType = (e) => {
    setSearchType(e.key)
  }
  return (
    <>
      <NavbarLeft></NavbarLeft>
      <Layout>
        <Sider width="250" style={siderStyle}>
          <h3>{t('header.title')}</h3>
          <Divider />
          <ProjectType>
            <h4>{t('header.subtitle')}</h4>
            <Menu
              onClick={changeType}
              style={{ background: 'rgb(244, 245, 247)', border: 'none' }}
              defaultSelectedKeys={['all']}
              items={[
                {
                  key: 'all',
                  icon: <LayoutOutlined className="icon" />,
                  label: 'All Project',
                },
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
            <h3>
              {searchType} - {t('header.subtitle')}
            </h3>
            <Search
              style={{ width: '260px', margin: '20px 0' }}
              placeholder={t('header.seatchText')}
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
