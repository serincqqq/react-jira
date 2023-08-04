import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon, { CheckSquareFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import Avatar from '@/components/Avatar'
import { IssueLink, Issue, Bottom, IssueTitle } from './Styles'
import { IconStyle } from '@/components/Select/Styles'
import { priorityOptions } from '@/shared/staticData/priorityOptions'
import { getUserAvatar } from '@/services'
export default function BoardIssue({ issue, index }) {
  const location = useLocation()
  //要查一下人才能展示
  const [assignee, setAssignee] = useState({})
  useEffect(() => {
    getUserAvatar(issue.assignee.key).then((res) => {
      setAssignee(res.data)
    })
  }, [])
  const TypeIcon = ({ type, color }) => {
    const IconComponent = type === 'Task' ? CheckSquareFilled : ExclamationCircleFilled

    return <IconComponent style={{ color, marginRight: '10px' }} />
  }
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
                  <TypeIcon
                    type={issue.issuetype}
                    color={issue.issuetype === 'Task' ? '#4FADE6' : '#E44D42'}
                  />
                  <IconStyle priority={issue.priority.key}>
                    <Icon
                      component={
                        priorityOptions.find((item) => item.key === issue.priority.key)?.icon
                      }
                    />
                  </IconStyle>
                </div>
                <Avatar assignees={assignee.userAvatar} />
              </Bottom>
            </Issue>
          </IssueLink>
        )}
      </Draggable>
    </>
  )
}
