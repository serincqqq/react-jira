import { IssueLink, Issue, Bottom, Assignees, IssueTitle, AssigneeAvatar } from './Styles'
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleFilled, CheckSquareFilled } from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
export default function BoardIssue({ issue, index }) {
  //const index = useState(1)
  const [assignees] = useState([
    {
      id: '1',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
    // {
    //   id: '2',
    //   avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    // },
  ])
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
  )
}
