import { useState, Fragment, useEffect } from 'react'
import { Outlet, useParams, useLocation, useNavigate, Route } from 'react-router-dom'
import PubSub from 'pubsub-js'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { Modal } from 'antd'
import { List, Title, IssuesCount, Issues, Nav, Divider } from './Styles'
import BoardIssue from './components/BoardIssue'
import { getMyIssue, updateIssue } from '@/services'
import { useTranslation } from 'react-i18next'
export const IssueStatus = {
  BACKLOG: 'backlog',
  SELECTED: 'selected',
  INPROGRESS: 'inprogress',
  DONE: 'done',
}

export default function MyIssue() {
  const { issueId, projectId } = useParams()
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const user = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData'))
  const init = () => {
    getMyIssue(projectId, user._id).then((res) => {
      // if(res)
      setIssues(res.data)
    })
  }
  useEffect(() => {
    //订阅消息如果不放在生命周期钩子中就会调用多次
    PubSub.subscribe('refresh', (_) => {
      init()
    })
    init()
  }, [])

  const Breadcrumbs = ['Projects', projectId, 'Project Details']
  const getSortedListIssues = (issues, status) =>
    issues.filter((issue) => issue.status.key === status)
  const hideModal = () => {
    navigate(location.pathname.substring(0, location.pathname.indexOf('/issue')))
  }
  const handleDragUpdate = (dragUpdate) => {
    //实际接口中在这里修改状态
    const { destination, source, draggableId } = dragUpdate
    updateIssue(draggableId, {
      status: { label: destination.droppableId, key: destination.droppableId },
      updatedAt: new Date(),
    }).then((res) => init())
    if (!destination) {
      return
    }
    //destination, source的 droppableId可以知道item要拖拽到哪个组件中，因此要求每个状态必须有自己对应的数组,根据id从数组里面找值
    if (destination.index === source.index) {
      return
    }
  }

  return (
    <>
      <Nav>
        {Breadcrumbs.map((item, index) => {
          return (
            <Fragment key={item}>
              {index !== 0 && <Divider>/</Divider>}
              {item}
            </Fragment>
          )
        })}
      </Nav>
      <h2>{t('issue.board')}</h2>
      <DragDropContext onDragUpdate={handleDragUpdate}>
        <div style={{ display: 'flex' }}>
          {Object.values(IssueStatus).map((status) => {
            return (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <List>
                    <Title>
                      {status}
                      <IssuesCount>
                        {issues.filter((obj) => obj.status.key === status).length}
                      </IssuesCount>
                    </Title>
                    <Issues {...provided.droppableProps} ref={provided.innerRef}>
                      {getSortedListIssues(issues, status).map((item, index) => {
                        return <BoardIssue key={item._id} issue={item} index={index} />
                      })}
                      {provided.placeholder}
                    </Issues>
                  </List>
                )}
              </Droppable>
            )
          })}
        </div>
      </DragDropContext>
      <Modal
        footer={null}
        width={950}
        open={location.pathname === `/project/${projectId}/myIssue/issue/${issueId}`}
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
