import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Tag } from 'antd'
import PubSub from 'pubsub-js'
import { getIssueList } from '@/services'

import dayjs from 'dayjs'
export default function ProjectBoard(props) {
  const columns = [
    {
      title: 'summary',
      //通过这一项来匹配表格字段
      dataIndex: 'summary',
      key: 'summary',
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
  const [data, setData] = useState([])
  const init = () => {
    getIssueList(projectId).then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    //订阅消息如果不放在生命周期钩子中就会调用多次
    PubSub.subscribe('refresh', (_) => {
      init()
    })
    init()
  }, [])
  return <Table columns={columns} dataSource={data} rowKey="_id" />
}
