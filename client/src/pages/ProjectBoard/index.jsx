import { useState, Fragment, useEffect } from 'react'
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { Modal } from 'antd'
import { List, Title, IssuesCount, Issues, Nav, Divider } from './Styles'
import BoardIssue from './components/BoardIssue'
import { getIssueList, updateIssue } from '@/services'
export const IssueStatus = {
  BACKLOG: 'backlog',
  SELECTED: 'selected',
  INPROGRESS: 'inprogress',
  DONE: 'done',
}

export default function ProjectBoard() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])

  const init = () => {
    getIssueList().then((res) => {
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

  const Breadcrumbs = ['Projects', params.projectId, 'Project Details']
  const getSortedListIssues = (issues, status) =>
    issues.filter((issue) => issue.status.key === status)
  const hideModal = () => {
    navigate(-1)
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
      <h2>Kanban board</h2>
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
        open={location.pathname === `/project/${params.projectId}/board/issue/${params.issueId}`}
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
