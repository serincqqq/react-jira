import { Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './i18n/config.js'
import './App.css'
import 'antd/dist/reset.css'
import './fontStyles.css'
import NormalizeStyles from './NormalizeStyles'
import routes from './routes'
import BaseStyles from './BaseStyles'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const RouteAuthFun = (routeList) => {
    return routeList.map((item) => {
      return (
        <Route
          path={item.path}
          element={
            <PrivateRoute auth={item.auth} key={item.path}>
              {item.element}
            </PrivateRoute>
          }
          key={item.path}
        >
          {item?.children && RouteAuthFun(item.children)}
        </Route>
      )
    })
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0747a6',
          borderRadius: 4,
        },
      }}
    >
      <BaseStyles></BaseStyles>
      <NormalizeStyles></NormalizeStyles>
      <Routes>{RouteAuthFun(routes)}</Routes>
    </ConfigProvider>
  )
}

export default App
