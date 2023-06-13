import { useRoutes } from 'react-router-dom'
import './App.css'
import 'antd/dist/reset.css'
import './fontStyles.css'
import NormalizeStyles from './NormalizeStyles'
import routes from './routes'
import BaseStyles from './BaseStyles'
function App() {
  const element = useRoutes(routes)
  return (
    <>
      <BaseStyles></BaseStyles>
      <NormalizeStyles></NormalizeStyles>
      {element}
    </>
  )
}

export default App
