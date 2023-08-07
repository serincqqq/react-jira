import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import routes from './index'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { t } from 'i18next'
import { login } from '@/services'
export default function PrivateRoute({ auth, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  // const token = localStorage.getItem('jiraToken') || sessionStorage.getItem('jiraToken')
  // const mathchs = matchRoutes(routes, location)
  // const isExist = mathchs?.some((item) => item.pathname === location.pathname)
  useEffect(() => {
    login().then((res) => {
      if (res.code !== 0) {
        message.error(t('tips.token'))
        localStorage.removeItem('jiraToken')
        sessionStorage.removeItem('jiraToken')
        navigate('/login')
      } else {
        if (location.pathname === '/' || location.pathname === '/login') {
          message.success(t('tips.login'))
          navigate('/browseProjects')
        } else {
          navigate(location.pathname)
        }
      }
    })
  }, [location.pathname])
  return children
}
