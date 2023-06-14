import Project from '../pages/Project'
import ProjectSetting from '../pages/ProjectSetting'
import ProjectBoard from '../pages/ProjectBoard'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/project',
    element: <Project></Project>,
    children: [
      {
        path: 'board',
        element: <ProjectBoard></ProjectBoard>,
      },
      {
        path: 'setting',
        element: <ProjectSetting></ProjectSetting>,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/project" />,
  },
]
