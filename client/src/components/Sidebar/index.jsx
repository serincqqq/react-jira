import { NavLink, useParams } from 'react-router-dom'
import { SettingOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'

import {
  LinkItem,
  ProjectInfo,
  ProjectHeader,
  LinkText,
  ProjectAvatar,
  ProjectTitle,
  ProjectTexts,
  ProjectDes,
} from './Styles'
import { useEffect, useState } from 'react'
import { getProjectDetail } from '@/services'
export default function Sidebar() {
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const params = useParams()
  const { projectId } = params
  useEffect(() => {
    getProjectDetail(projectId).then((res) => {
      const { projectName, projectType } = res.data
      setProjectName(projectName)
      setProjectType(projectType)
    })
  }, [])
  return (
    <ProjectInfo>
      <ProjectHeader>
        <ProjectAvatar></ProjectAvatar>
        <ProjectTexts>
          <ProjectTitle>{projectName}</ProjectTitle>
          <ProjectDes>{projectType + ' Project'}</ProjectDes>
        </ProjectTexts>
      </ProjectHeader>
      <LinkItem as={NavLink} to={`/project/${projectId}/board`}>
        <FundProjectionScreenOutlined style={{ fontSize: '18px', marginRight: '20px' }} />
        <LinkText>Kanban Board</LinkText>
      </LinkItem>
      <LinkItem as={NavLink} to={`/project/${projectId}/setting`}>
        <SettingOutlined style={{ fontSize: '18px', marginRight: '20px' }} />
        <LinkText>Project settings</LinkText>
      </LinkItem>
    </ProjectInfo>
  )
}
