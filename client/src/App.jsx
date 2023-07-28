import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './App.css'
import 'antd/dist/reset.css'
import './fontStyles.css'
import NormalizeStyles from './NormalizeStyles'
import routes from './routes'
import BaseStyles from './BaseStyles'

function App() {
  const element = useRoutes(routes)
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
      {element}
    </ConfigProvider>
  )
}

export default App
