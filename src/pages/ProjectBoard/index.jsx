import { useLocation } from 'react-router-dom'

import { List, Title, IssuesCount, Issues } from './Styles'
import { useState } from 'react'
import BoderIssue from '../../components/BoderIssue'
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
  ])
  return (
    <>
      <nav>{currentPath}</nav>
      <h2>Kanban board</h2>
      <div style={{ display: 'flex' }}>
        {projectBoardList.map((item) => {
          return (
            <List>
              <Title>
                {item.name}
                <IssuesCount>{item.count}</IssuesCount>
              </Title>
              <Issues>
                <BoderIssue></BoderIssue>
              </Issues>
            </List>
          )
        })}
      </div>
    </>
  )
}
