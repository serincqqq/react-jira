import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { List, Title, IssuesCount, Issues, Nav, Divider } from './Styles'
import { useState, Fragment } from 'react'
import { Modal } from 'antd'
import BoardIssue from '../../components/BoardIssue'
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

  const issues = [
    {
      id: 1097637,
      title: 'Try dragging issues to different columns to transition their status.',
      type: 'story',
      status: 'backlog',
      priority: '3',
      listPosition: 3,
      createdAt: '2023-05-17T07:09:07.537Z',
      updatedAt: '2023-05-17T07:09:07.537Z',
      userIds: [],
    },
    {
      id: 1097640,
      title: 'Each issue has a single reporter but can have multiple assignees.',
      type: 'story',
      status: 'selected',
      priority: '4',
      listPosition: 6,
      createdAt: '2023-05-17T07:09:07.566Z',
      updatedAt: '2023-05-17T07:09:07.566Z',
      userIds: [405880, 405881],
    },
    {
      id: 1097636,
      title: "Click on an issue to see what's behind it.",
      type: 'task',
      status: 'done',
      priority: '2',
      listPosition: 2,
      createdAt: '2023-05-17T07:09:07.537Z',
      updatedAt: '2023-06-14T08:03:26.258Z',
      userIds: [405882],
    },
    {
      id: 1097638,
      title: 'You can use rich text with images in issue descriptions.',
      type: 'story',
      status: 'selected',
      priority: '1',
      listPosition: 7,
      createdAt: '2023-05-17T07:09:07.555Z',
      updatedAt: '2023-06-14T06:11:36.217Z',
      userIds: [405881],
    },
    {
      id: 1097639,
      title: 'Each issue can be assigned priority from lowest to highest.',
      type: 'task',
      status: 'done',
      priority: '5',
      listPosition: 1,
      createdAt: '2023-05-17T07:09:07.557Z',
      updatedAt: '2023-06-14T06:11:53.359Z',
      userIds: [],
    },
    {
      id: 1097642,
      title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
      type: 'task',
      status: 'inprogress',
      priority: '1',
      listPosition: 7,
      createdAt: '2023-05-17T07:09:07.571Z',
      updatedAt: '2023-05-17T07:09:07.571Z',
      userIds: [],
    },
    {
      id: 1097635,
      title: 'This is an issue of type: Task.',
      type: 'task',
      status: 'inprogress',
      priority: '3',
      listPosition: 1,
      createdAt: '2023-05-17T07:09:07.537Z',
      updatedAt: '2023-05-30T03:06:30.488Z',
      userIds: [405880],
    },
    {
      id: 1097641,
      title: 'Try leaving a comment on this issue.',
      type: 'task',
      status: 'selected',
      priority: '3',
      listPosition: 8,
      createdAt: '2023-05-17T07:09:07.572Z',
      updatedAt: '2023-06-14T06:13:14.243Z',
      userIds: [405880],
    },
  ]
  const Breadcrumbs = ['Projects', params.projectId, 'Project Details']
  const getSortedListIssues = (issues, status) => issues.filter((issue) => issue.status === status).sort((a, b) => a.listPosition - b.listPosition)
  const hideModal = () => {
    navigate(-1)
  }
  const handleDragUpdate = (dragUpdate) => {
    //实际接口中在这里修改状态
    const { destination, source, draggableId } = dragUpdate
    let test = issues.filter((item) => item.id === Number(draggableId))
    test[0].status = destination.droppableId

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
                      <IssuesCount>1</IssuesCount>
                    </Title>
                    <Issues {...provided.droppableProps} ref={provided.innerRef}>
                      {getSortedListIssues(issues, status).map((item, index) => {
                        return <BoardIssue key={item.id} issue={item} index={index} />
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
      <Modal width={670} open={location.pathname === `/project/${params.projectId}/board/issue/${params.issueId}`} onOk={hideModal} onCancel={hideModal} okText="确认" cancelText="取消">
        <Outlet></Outlet>
      </Modal>
    </>
  )
}
