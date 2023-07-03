import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpOutlined, CheckSquareFilled } from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import Avatar from '@/components/Avatar'
import { IssueLink, Issue, Bottom, IssueTitle } from './Styles'
export default function BoardIssue({ issue, index }) {
  const [assignees] = useState([
    {
      id: '1',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
  ])
  const location = useLocation()

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
                <Avatar assignees={assignees} />
              </Bottom>
            </Issue>
          </IssueLink>
        )}
      </Draggable>
    </>
  )
}
