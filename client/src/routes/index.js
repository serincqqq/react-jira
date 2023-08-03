import Project from '../pages/Project'
import ProjectSetting from '../pages/ProjectSetting'
import ProjectBoard from '../pages/ProjectBoard'
import IssueDetails from '../pages/IssueDetails'
import BrowseProjects from '../pages/BrowseProjects'
import { Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import MyIssue from '@/pages/MyIssue'
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/login',
    element: <Login></Login>,
    auth: false,
  },
  {
    path: '/browseProjects',
    element: <BrowseProjects></BrowseProjects>,
    auth: true,
  },
  {
    path: '/project/:projectId',
    element: <Project></Project>,
    auth: true,
    children: [
      {
        path: 'myIssue',
        element: <MyIssue></MyIssue>,
        children: [
          {
            path: 'issue/:issueId',
            element: <IssueDetails></IssueDetails>,
          },
        ],
      },
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
        //  {
        //     path: 'issue/:issueId',
        //     element: <IssueDetails></IssueDetails>,
        //   },
      {
        path: 'setting',
        element: <ProjectSetting></ProjectSetting>,
      },
    ],
  },
  // {
  //   path: '/',
  //   element: <Layout></Layout>,
  //   auth: true,
  //   children: [
  //     {
  //       path: '/browseProjects',
  //       element: <BrowseProjects></BrowseProjects>,
  //       auth: true,
  //     },
  //     {
  //       path: '/project/:projectId',
  //       element: <Project></Project>,
  //       // auth: true,
  //       children: [
  //         {
  //           path: 'board',
  //           element: <ProjectBoard></ProjectBoard>,
  //           children: [
  //             {
  //               path: 'issue/:issueId',
  //               element: <IssueDetails></IssueDetails>,
  //             },
  //           ],
  //         },
  //         {
  //           path: 'setting',
  //           element: <ProjectSetting></ProjectSetting>,
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    path: '/',
    element: <Navigate to="/login" />,
  },
]
// https://pythonjishu.com/qpoeonfhqgofzlm/
