import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProjectPage } from './Styles'
import NavbarLeft from '../../components/NavbarLeft'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal'

const Projetc = () => {
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
