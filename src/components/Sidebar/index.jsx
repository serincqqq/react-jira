import { LinkItem, ProjectInfo, ProjectHeader, LinkText, ProjectAvatar, ProjectTitle, ProjectTexts, ProjectDes } from './Styles'
import { SettingOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
  const projectId = '001'
  return (
    <ProjectInfo>
      <ProjectHeader>
        <ProjectAvatar></ProjectAvatar>
        <ProjectTexts>
          <ProjectTitle>singularity 1.0</ProjectTitle>
          <ProjectDes>Software project</ProjectDes>
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
