import Project from '../pages/Project'
import ProjectSetting from '../pages/ProjectSetting'
import ProjectBoard from '../pages/ProjectBoard'
import IssueDetails from '../pages/IssueDetails'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  //要补上一个所有项目的起始页
  {
    path: '/project/:projectId',
    element: <Project></Project>,
    children: [
      {
        path: 'board',
        element: <ProjectBoard></ProjectBoard>,
        children: [
          {
            path: 'issue/:issueId',
            element: <IssueDetails></IssueDetails>,
          },
        ],
      },
      {
        path: 'setting',
        element: <ProjectSetting></ProjectSetting>,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/project/setting" />,
  },
]
