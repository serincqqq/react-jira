import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProjectPage } from './Styles'
import NavbarLeft from '../../components/NavbarLeft'
import Sidebar from '../../components/Sidebar'
import ProjectSetting from '../ProjectSetting'
import Modal from '../../components/Modal'

const Projetc = () => {
  const project = {
    id: 135048,
    name: 'singularity 1.0',
    url: 'https://www.atlassian.com/software/jira',
    description: 'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
    category: 'software',
    createdAt: '2023-05-17T07:09:07.527Z',
    updatedAt: '2023-05-17T07:09:07.527Z',
    users: [
      {
        id: 405882,
        name: 'Pickle Rick',
        email: 'rick@jira.guest',
        avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
        createdAt: '2023-05-17T07:09:07.522Z',
        updatedAt: '2023-05-17T07:09:07.527Z',
        projectId: 135048,
      },
      {
        id: 405880,
        name: 'Baby Yoda',
        email: 'yoda@jira.guest',
        avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
        createdAt: '2023-05-17T07:09:07.518Z',
        updatedAt: '2023-05-17T07:09:07.527Z',
        projectId: 135048,
      },
      {
        id: 405881,
        name: 'Lord Gaben',
        email: 'gaben@jira.guest',
        avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
        createdAt: '2023-05-17T07:09:07.519Z',
        updatedAt: '2023-05-17T07:09:07.527Z',
        projectId: 135048,
      },
    ],
    issues: [
      {
        id: 1097636,
        title: "Click on an issue to see what's behind it.",
        type: 'task',
        status: 'backlog',
        priority: '2',
        listPosition: 2,
        createdAt: '2023-05-17T07:09:07.537Z',
        updatedAt: '2023-05-17T07:09:07.537Z',
        userIds: [405882],
      },
      {
        id: 1097637,
        title: 'Try dragging issues to different columns to transition their status.',
        type: 'story',
        status: 'backlog',
        priority: '3',
        listPosition: 3,
        createdAt: '2023-05-17T07:09:07.537Z',
        updatedAt: '2023-05-17T07:09:07.537Z',
        userIds: [],
      },
      {
        id: 1097638,
        title: 'You can use rich text with images in issue descriptions.',
        type: 'story',
        status: 'backlog',
        priority: '1',
        listPosition: 4,
        createdAt: '2023-05-17T07:09:07.555Z',
        updatedAt: '2023-05-17T07:09:07.555Z',
        userIds: [405881],
      },
      {
        id: 1097639,
        title: 'Each issue can be assigned priority from lowest to highest.',
        type: 'task',
        status: 'selected',
        priority: '5',
        listPosition: 5,
        createdAt: '2023-05-17T07:09:07.557Z',
        updatedAt: '2023-05-17T07:09:07.557Z',
        userIds: [],
      },
      {
        id: 1097640,
        title: 'Each issue has a single reporter but can have multiple assignees.',
        type: 'story',
        status: 'selected',
        priority: '4',
        listPosition: 6,
        createdAt: '2023-05-17T07:09:07.566Z',
        updatedAt: '2023-05-17T07:09:07.566Z',
        userIds: [405880, 405881],
      },
      {
        id: 1097641,
        title: 'Try leaving a comment on this issue.',
        type: 'task',
        status: 'done',
        priority: '3',
        listPosition: 7,
        createdAt: '2023-05-17T07:09:07.572Z',
        updatedAt: '2023-05-17T07:09:07.572Z',
        userIds: [405880],
      },
      {
        id: 1097642,
        title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
        type: 'task',
        status: 'inprogress',
        priority: '1',
        listPosition: 7,
        createdAt: '2023-05-17T07:09:07.571Z',
        updatedAt: '2023-05-17T07:09:07.571Z',
        userIds: [],
      },
      {
        id: 1097635,
        title: 'This is an issue of type: Task.',
        type: 'task',
        status: 'inprogress',
        priority: '3',
        listPosition: 1,
        createdAt: '2023-05-17T07:09:07.537Z',
        updatedAt: '2023-05-30T03:06:30.488Z',
        userIds: [405880],
      },
    ],
  }
  // const issueSearchModalHelpers
  return (
    <ProjectPage>
      <NavbarLeft />
      <Sidebar></Sidebar>
      <Modal isOpen={true} />
      <Outlet></Outlet>
    </ProjectPage>
  )
}
export default Projetc
