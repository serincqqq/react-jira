import React from 'react'
import { Outlet, useParams, useLocation, useNavigate, Route } from 'react-router-dom'
import { ProjectPage } from './Styles'
import NavbarLeft from '../../components/NavbarLeft'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal'
import Routes from '../../routes'

const Projetc = () => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const hideModal = () => {
    navigate(-1)
  }
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
