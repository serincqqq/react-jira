import React, { useEffect, useState } from 'react'
import { Popover, Button } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import { NavLeft, LogoLink, StyledLogo, UserAvatar, Item, ItemText } from './Styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TransBtn from '../TransBtn'

export default function NavbarLeft() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const isProject = location.pathname === '/browseProjects'
  const [userData, setUserData] = useState({
    userAvatar: '',
    userName: '',
  })
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])
  const issueSearchModalOpen = () => {
    if (!isProject) PubSub.publish('modalType', { modal: 'modal_search' })
  }
  const issueCreateModalOpen = () => {
    if (isProject) PubSub.publish('openModal')
    else PubSub.publish('modalType', { modal: 'modal_create' })
  }
  const logout = () => {
    localStorage.removeItem('jiraToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }
  return (
    <NavLeft>
      <LogoLink to="/">
        <StyledLogo color="#fff" />
      </LogoLink>
      <Popover
        content={
          <Button onClick={logout} danger type="text">
            {t('nav.logout')}
          </Button>
        }
        trigger="click"
      >
        <Item>
          <UserAvatar avatar={userData?.userAvatar} />
          <ItemText>{userData?.userName}</ItemText>
        </Item>
      </Popover>
      {isProject ? (
        ''
      ) : (
        <Item onClick={issueSearchModalOpen}>
          <SearchOutlined style={{ fontSize: '24px' }} />
          <ItemText>{t('nav.searchIssues')}</ItemText>
        </Item>
      )}

      <Item onClick={issueCreateModalOpen}>
        <PlusOutlined style={{ fontSize: '24px' }} />
        <ItemText>{isProject ? t('nav.createProject') : t('nav.createIssue')}</ItemText>
      </Item>
      <Item>
        <TransBtn></TransBtn>
        <ItemText> {t('nav.createIssue')}</ItemText>
      </Item>
    </NavLeft>
  )
}
