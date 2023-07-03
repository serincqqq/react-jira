import Project from '../pages/Project'
import ProjectSetting from '../pages/ProjectSetting'
import ProjectBoard from '../pages/ProjectBoard'
import IssueDetails from '../pages/IssueDetails'
import BrowseProjects from '../pages/BrowseProjects'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: 'browseProjects',
    element: <BrowseProjects></BrowseProjects>,
  },
  //要补上一个所有项目的起始页(需要一个单独的路由)
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
    element: <Navigate to="/browseProjects" />,
  },
]
