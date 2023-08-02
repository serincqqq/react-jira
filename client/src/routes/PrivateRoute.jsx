import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import routes from './index'
import { useEffect } from 'react'
import { message } from 'antd'
export default function PrivateRoute({ auth, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('jiraToken') || ''
  const mathchs = matchRoutes(routes, location)
  const isExist = mathchs?.some((item) => item.pathname === location.pathname)
  const loginState = 'login'
  useEffect(() => {
    if (token === '' && auth) {
      message.error('token 过期，请重新登录!')
      navigate('/login')
    }
    if (token && isExist && loginState === 'login') {
      if (location.pathname === '/' || location.pathname === '/login') {
        message.success('登录成功!')
        navigate('/browseProjects')
      } else {
        navigate(location.pathname)
      }
    }
  }, [token, location.pathname])
  return children
}
