import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown  } from 'react-bootstrap'
import { MasalaContext } from '../../Context/MasalaProvider';
import { deleteLocalStorage } from '../../utils/localStorageUtils';
import './navbar.scss'
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { FormularioContacto } from '../FormularioContacto/FormularioContacto';
import { FormularioLogin } from '../FormularioLogin/FormularioLogin';
import { ModalBasico2 } from '../ModalBasico2/ModalBasico2';
import { FormularioCurso } from '../FormularioCurso/FormularioCurso';
import { FormularioTag } from '../FormularioTag/FormularioTag';

export const NavBarApp= () => {

  const navigate = useNavigate();
  const {user, setUser, setToken}= useContext(MasalaContext)
  const [courses, setCourses] = useState([])
  const[show, setShow]=useState(false)
  const[show2, setShow2]=useState(false)
  const[show3, setShow3]=useState(false)
  const[show4, setShow4]=useState(false)


  const showModal =()=>{
    setShow(!show)
  }
  const showModal2 =()=>{
    setShow2(!show2)
  }
  const showModal3 =()=>{
    setShow3(!show3)
  }
  const showModal4 =()=>{
    setShow4(!show4)
  }

  const LogOut=()=>{
    deleteLocalStorage("token")
    setUser()
    setToken()
    navigate("/")
  }

  /* click hamburguesa para submenú del dropdown */
  const pulsar = () => {
    document.getElementById('navbar-toggle').click();
  }
 
  return (
    <Navbar expand="lg" className="custom-navbar-bg fixed-top">
      <Container fluid className='fluid-nav'>
        <div className='nav-alinear1'>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" alt="logotipo" className='logo-nav' />
            <span className='masala-text'>MASALA</span><span className='head-text'>HEAD</span>
          </Navbar.Brand>
        </div>
        <div className='d-flex justify-content-end nav-alinear2'>
          <div className='hamburguesa-logo'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {!user ?
                  <div>
                  </div>
                  :
            <div className='navatar-movil'> {/* logo móvil */}
                {user?.user_img
                                  ?
                                  <img src={`http://localhost:3000/images/users/${user?.user_img}`} alt="foto perfil" />
                                  :
                                  <div className='div-span-movil'><span>{user?.name[0].toUpperCase()}</span></div>}
                </div>}
          </div>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav
              className="me-auto my-2 my-lg-0 dropdawn-menu"
            >
              {user?.type===1 ?
              <div className='d-flex flex-wrap'>
              <Nav.Link href="/allUsers" className='masala-text'>USUARIOS</Nav.Link>
              <Nav.Link href="/allCourses" className='masala-text'>CURSOS</Nav.Link>
              <Nav.Link onClick={showModal3} className='masala-text'>CREAR CURSOS</Nav.Link>
              <div className='botonera-movil-1'>
                {!user ? (
                        <Button onClick={showModal2} className='ml-auto'>Iniciar sesión</Button>
                
                    ) : (
                      <Button onClick={LogOut} className='ms-1 me-1' variant="outline-success">LogOut</Button>
                    )}
              </div>
              </div> 
              :
              <div className='d-flex flex-wrap'>
              <Nav.Link href="#" className='masala-text'>PORTFOLIO</Nav.Link>
              <Nav.Link href="#who" onClick={()=>{navigate('/')}} className='masala-text'>QUIENES SOMOS</Nav.Link>
              <Nav.Link href="#servicios" onClick={()=>{navigate('/')}}  className='masala-text'>SERVICIOS</Nav.Link>
              <Nav.Link href="#" className='masala-text'>BLOG</Nav.Link>
              <Nav.Link href="#footer" onClick={showModal} className='masala-text'>CONTACTO</Nav.Link>

              {/* botonera iniciar sesión y desconectar vista móvil */}
              <div className='botonera-movil-1'>
                {!user ? (
                        <Button onClick={showModal2} className='ml-auto'>Iniciar sesión</Button>
                
                    ) : (
                      <Button onClick={LogOut} className='ms-1 me-1' variant="outline-success">LogOut</Button>
                    )}
              </div>
              </div>
              }
               
              {/* tamaño escritorio */}
              <div className='desktop-menu'>
                {!user ?
                  <div>
                    <Button
                      onClick={showModal2}
                      className='ml-auto' >Iniciar sesión</Button>
                  </div>
                  :
                  <div className='navbar-avatar'>
                    <NavDropdown id="basic-nav-dropdown" title={user?.user_img
                                  ?
                                  <img src={`http://localhost:3000/images/users/${user?.user_img}`} alt="foto perfil" />
                                  :
                                  <div className='div-span-escritorio'><span>{user?.name[0].toUpperCase()}</span></div>}
                    >
                    {user?.type===2 ?
                    <div>
                    <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={`/allCoursesProfile/${user?.user_id}`}>Todos los cursos</NavDropdown.Item>
                    <NavDropdown.Item onClick={showModal3}>Crear curso</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={'/myGrades'}>Calificaciones</NavDropdown.Item>
                    </div>
                    :
                    <div>
                    <NavDropdown.Item onClick={showModal4}>Crear TAG</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                    </div>
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                    <Button
                      onClick={LogOut}
                      className='ms-1 me-1'
                      variant="outline-success">
                    LogOut</Button>
                    </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  }
              </div>

                {/* tamaño móvil */}
                <div className='navbar-avatar-movil'>
                  {user ? (
                    user.type === 2 ? (
                      <NavDropdown title="MENÚ↪" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/profile" onClick={pulsar}>Perfil</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={`/allCoursesProfile/${user.user_id}`} onClick={pulsar}>Todos los cursos</NavDropdown.Item>
                        <NavDropdown.Item onClick={showModal3}>Crear curso</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/myGrades' onClick={pulsar}>Calificaciones</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <NavDropdown title="MENÚ↪" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={showModal4} id="enlace">Crear TAG</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/profile" id="enlace" onClick={pulsar}>Perfil</NavDropdown.Item>
                      </NavDropdown>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>

              <ModalBasico
              title="Contacto"
              show={show}
              handleClose={showModal}
              size="sm">
                <FormularioContacto
                handleClose={showModal}/>
              </ModalBasico>

              <ModalBasico2
              title="Login"
              show={show2}
              handleClose2={showModal2}
              size="sm">
                <FormularioLogin
                handleClose2={showModal2}/>
              </ModalBasico2>

              
              <ModalBasico2
              title="Creación Curso"
              show={show3}
              handleClose2={showModal3}>
                <FormularioCurso
                showModal3 ={showModal3}
                user_id={user?.user_id}
                courses={courses}
                setCourses={setCourses}
                />
              </ModalBasico2>

              <ModalBasico
              title="TAG"
              show={show4}
              handleClose={showModal4}
              size="sm"
              >
                <FormularioTag
                handleClose={showModal4}/>
              </ModalBasico>

            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>

  )
}