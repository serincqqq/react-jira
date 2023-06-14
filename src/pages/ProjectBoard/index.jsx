import { useLocation } from 'react-router-dom'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { List, Title, IssuesCount, Issues } from './Styles'
import { useState } from 'react'

import BoardIssue from '../../components/BoardIssue'
export const IssueStatus = {
  BACKLOG: 'backlog',
  SELECTED: 'selected',
  INPROGRESS: 'inprogress',
  DONE: 'done',
}
export default function ProjectBoard() {
  const location = useLocation()
  const currentPath = location.pathname
  const [projectBoardList] = useState([
    {
      name: 'BACKLOG',
      count: '3',
    },
    {
      name: 'IN PROGESS',
      count: '3',
    },
    {
      name: 'COMPLETED',
      count: '3',
    },
    {
      name: 'FIXED',
      count: '3',
    },
  ])
  const getSortedListIssues = (issues, status) => issues.filter((issue) => issue.status === status).sort((a, b) => a.listPosition - b.listPosition)
  //const filteredListIssues = getSortedListIssues(filteredIssues, status);
  return (
    <>
      <nav>{currentPath}</nav>
      <h2>Kanban board</h2>
      <DragDropContext>
        <div style={{ display: 'flex' }}>
          {Object.values(IssueStatus).map((status) => {
            return (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <List>
                    <Title>
                      xx
                      <IssuesCount>1</IssuesCount>
                    </Title>
                    <Issues {...provided.droppableProps} ref={provided.innerRef}>
                      {/* {filteredListIssues.map((issue, index) => (
                        <BoardIssue key={issue.id} projectUsers={project.users} issue={issue} index={index} />
                      ))} */}
                      <BoardIssue></BoardIssue>
                    </Issues>
                  </List>
                )}
              </Droppable>
            )
          })}
        </div>
      </DragDropContext>
      {/* <div style={{ display: 'flex' }}>
        {projectBoardList.map((item) => {
          return (
            <List>
              <Title>
                {item.name}
                <IssuesCount>{item.count}</IssuesCount>
              </Title>
              <Issues>
                <BoardIssue></BoardIssue>
              </Issues>
            </List>
          )
        })}
      </div> */}
    </>
  )
}
