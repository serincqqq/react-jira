import { IssueLink, Issue, Bottom, Assignees, IssueTitle, AssigneeAvatar } from './Styles'
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleFilled, CheckSquareFilled } from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import { Modal, Space } from 'antd'
import { useState } from 'react'
import { useParams, useLocation, Outlet, useNavigate } from 'react-router-dom'

export default function BoardIssue({ issue, index }) {
  const [assignees] = useState([
    {
      id: '1',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
  ])
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  const hideModal = () => {
    navigate(-1)
  }
  return (
    <>
      <Draggable draggableId={issue.id.toString()} index={index}>
        {(provided, snapshot) => (
          <IssueLink to={`${location.pathname}/issue/${issue.id}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
              <IssueTitle>{issue.title}</IssueTitle>
              <Bottom>
                <div>
                  <CheckSquareFilled style={{ color: '#4FADE6', marginRight: '10px' }} />
                  <ArrowUpOutlined style={{ color: '#CD1317' }} />
                </div>
                {/* 这里是经办人的头像列表 */}
                <Assignees>
                  {assignees.map((user) => (
                    <AssigneeAvatar key={user.id} avatarUrl={user.avatarUrl} />
                  ))}
                </Assignees>
              </Bottom>
            </Issue>
          </IssueLink>
        )}
      </Draggable>
      <Modal width={670} open={location.pathname === `/project/${params.projectId}/board/issue/${params.issueId}`} onOk={hideModal} onCancel={hideModal} okText="确认" cancelText="取消">
        <Outlet></Outlet>
      </Modal>
    </>
  )
}
