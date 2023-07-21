import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProjectPage } from './Styles'
import NavbarLeft from '@/components/NavbarLeft'
import Sidebar from '@/components/Sidebar'
import SearchDrawer from './components/SearchDrawer'
import CreateForm from './components/CreateForm'
const Project = () => {
  return (
    <ProjectPage>
      <NavbarLeft />
      <Sidebar></Sidebar>
      <SearchDrawer isOpen={true} />
      <CreateForm></CreateForm>
      <Outlet></Outlet>
    </ProjectPage>
  )
}
export default Project
