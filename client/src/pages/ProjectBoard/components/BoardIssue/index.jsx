import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon, {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckSquareFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import Avatar from '@/components/Avatar'
import { IssueLink, Issue, Bottom, IssueTitle } from './Styles'
import { IconStyle } from '@/components/Select/Styles'

const priorityOptions = [
  {
    label: 'Highest',
    key: 'Highest',
    icon: ArrowUpOutlined,
  },
  {
    label: 'High',
    key: 'High',
    icon: ArrowUpOutlined,
  },
  {
    label: 'Medium',
    key: 'Medium',
    icon: ArrowUpOutlined,
  },
  {
    label: 'Low',
    key: 'Low',
    icon: ArrowDownOutlined,
  },
  {
    label: 'Lowest',
    key: 'Lowest',
    icon: ArrowDownOutlined,
  },
]
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
      <Draggable draggableId={issue._id} index={index}>
        {(provided, snapshot) => (
          <IssueLink
            to={`${location.pathname}/issue/${issue._id}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
              <IssueTitle>{issue.summary}</IssueTitle>
              <Bottom>
                <div style={{ display: 'flex' }}>
                  {issue.issuetype === 'Task' ? (
                    <CheckSquareFilled
                      style={{ color: '#4FADE6', marginRight: '10px', marginTop: '2px' }}
                    />
                  ) : (
                    <ExclamationCircleFilled style={{ color: '#E44D42' }} />
                  )}
                  {/* 这里需要根据不同的权重展示图标和颜色 */}
                  <IconStyle priority={issue.priority.key}>
                    <Icon
                      component={
                        priorityOptions.find((item) => item.key === issue.priority.key)?.icon
                      }
                    />
                  </IconStyle>
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
