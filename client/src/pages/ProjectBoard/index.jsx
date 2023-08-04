import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Modal, Table, Tag } from 'antd'
import PubSub from 'pubsub-js'
import { getIssueList } from '@/services'
import { ProjectLink } from '../BrowseProjects/Styles'
export default function ProjectBoard(props) {
  const location = useLocation()
  const { issueId } = useParams()
  const columns = [
    {
      title: 'summary',
      //通过这一项来匹配表格字段
      dataIndex: 'summary',
      key: 'summary',
      render: (_, record) => (
        <ProjectLink to={`${location.pathname}/issue/${record._id}`}>{record.summary}</ProjectLink>
      ),
    },
    {
      title: ' issuetype',
      dataIndex: 'issuetype',
      key: 'issuetype',
    },

    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <Tag color="geekblue" key={status.key}>
          {status.label}
        </Tag>
      ),
    },
    {
      title: 'priority',
      dataIndex: 'priority',
      key: 'priority',
      // 可以进行一下颜色控制
      render: (_, record) => <span>{record.priority.label}</span>,
    },

    {
      title: 'reporter',
      dataIndex: 'reporter',
      key: 'reporter',
      render: (_, { reporter }) => <span>{reporter.label}</span>,
    },
    {
      title: 'assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (_, { assignee }) => <span>{assignee.label}</span>,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const init = () => {
    getIssueList(projectId).then((res) => {
      setData(res.data)
    })
  }
  const hideModal = () => {
    navigate(location.pathname.substring(0, location.pathname.indexOf('/issue')))
  }
  useEffect(() => {
    //订阅消息如果不放在生命周期钩子中就会调用多次
    PubSub.subscribe('refresh', (_) => {
      init()
    })
    init()
  }, [])
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Modal
        footer={null}
        width={950}
        open={location.pathname === `/project/${projectId}/board/issue/${issueId}`}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <Outlet></Outlet>
      </Modal>
    </>
  )
}
