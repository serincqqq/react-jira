import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import routes from './index'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { t } from 'i18next'
import { login } from '@/services'
export default function PrivateRoute({ auth, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('jiraToken') || sessionStorage.getItem('jiraToken')

  const mathchs = matchRoutes(routes, location)
  const isExist = mathchs?.some((item) => item.pathname === location.pathname)
  const loginState = useState('Expired')
  useEffect(() => {
    login()
      .then((res) => {
        if (res.code !== 0) console.log('no')
      })
      .catch((error) => console.log('rr', error))

    //逻辑需要改一下
    // if (token === null && auth) {
    //   message.error(t('tips.token'))
    //   navigate('/login')
    // }
    // if (token && isExist && loginState === 'login') {
    //   if (location.pathname === '/' || location.pathname === '/login') {
    //     message.success(t('tips.login'))
    //     navigate('/browseProjects')
    //   } else {
    //     navigate(location.pathname)
    //   }
    // }
  }, [token, location.pathname])
  return children
}
