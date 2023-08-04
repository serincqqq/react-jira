import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import routes from './index'
import { useEffect } from 'react'
import { message } from 'antd'
import { t } from 'i18next'
export default function PrivateRoute({ auth, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('jiraToken') || sessionStorage.getItem('jiraToken')

  const mathchs = matchRoutes(routes, location)
  const isExist = mathchs?.some((item) => item.pathname === location.pathname)
  const loginState = 'login'
  useEffect(() => {
    if (token === null && auth) {
      message.error(t('tips.token'))
      navigate('/login')
    }
    if (token && isExist && loginState === 'login') {
      if (location.pathname === '/' || location.pathname === '/login') {
        message.success(t('tips.login'))
        navigate('/browseProjects')
      } else {
        navigate(location.pathname)
      }
    }
  }, [token, location.pathname])
  return children
}
