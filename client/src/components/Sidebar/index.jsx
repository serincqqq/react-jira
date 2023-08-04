import { NavLink, useParams } from 'react-router-dom'
import { SettingOutlined, FundProjectionScreenOutlined, LaptopOutlined } from '@ant-design/icons'

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
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [userData, setUserData] = useState({})
  const { t } = useTranslation()
  const params = useParams()
  const { projectId } = params
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
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
      <LinkItem as={NavLink} to={`/project/${projectId}/myIssue`}>
        <LaptopOutlined style={{ fontSize: '18px', marginRight: '20px' }} />
        <LinkText>{t('issue.own')}</LinkText>
      </LinkItem>
      <LinkItem as={NavLink} to={`/project/${projectId}/board`}>
        <FundProjectionScreenOutlined style={{ fontSize: '18px', marginRight: '20px' }} />
        <LinkText>{t('issue.board')}</LinkText>
      </LinkItem>
      <LinkItem as={NavLink} to={`/project/${projectId}/setting`}>
        <SettingOutlined style={{ fontSize: '18px', marginRight: '20px' }} />
        <LinkText>{t('issue.setting')}</LinkText>
      </LinkItem>
    </ProjectInfo>
  )
}
