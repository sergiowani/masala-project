import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../Context/MasalaProvider'
import { Button, Col, Row } from 'react-bootstrap'
import './userProfile.scss'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'
import { EditUser } from '../EditUser/EditUser'
import { invertirFecha } from '../../utils/reverseDate';
import { AllCoursesOneUserEnroll } from '../../components/AllCoursesOneUserEnroll/AllCoursesOneUserEnroll'
import { AllCoursesOneUserCreate } from '../../components/AllCoursesOneUserCreate/AllCoursesOneUserCreate'
import axios from 'axios'
import { deleteLocalStorage } from '../../utils/localStorageUtils'
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const [show, setShow] = useState(false);
  const {user, setToken, setUser} = useContext(MasalaContext);

  const navigate = useNavigate();

  const showModal = () => {
    setShow(!show)
  }

  const erase = () => {
    if (window.confirm("¿Estás seguro de que deseas borrar tu usuario?")) {
      axios
        .put('http://localhost:3000/users/deleteUser', { user_id: user.user_id })
        .then((res) => {
          deleteLocalStorage("token")
          setToken()
          setUser()
          navigate('/')
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <section>
      <Row className='profile-section'>
        {/* perfil */}
        <Col md={6} lg={4} className='sd-custom md-custom profile-col'>
          <div className='use-profile-ppal'>
            <div className='d-flex justify-content-between profile-img-cont'>
              {/* foto perfil */}
              <img 
                src={user?.user_img ? `http://localhost:3000/images/users/${user?.user_img}` : '/images/user.png'} 
                alt="foto perfil" 
                className='profile-img' 
              />
              {/* div iconos editar y borrar */}
              <div className='d-flex justify-content-end iconos-prof'>
                {/* icono editar */}
                <img 
                  src="/icons/437886-200.png" 
                  alt="editar" 
                  className='profile-edit' 
                  onClick={showModal} 
                />
                {/* icono borrar */}
                <img 
                  src="/icons/delete.png" 
                  alt="borrar" 
                  className='profile-delete' 
                  onClick={erase}
                />
              </div>
            </div>
            <div className='d-flex flex-column'>
              <span className='profile-text'>Nombre: </span>
              <span className='profile-gold-text'>{user?.name}</span>
              
              <span className='profile-text'>Apellidos: </span>
              <span className='profile-gold-text'>{user?.lastname}</span>
              <span className='profile-text'>D.N.I.: </span>
              <span className='profile-gold-text'>{user?.dni}</span>
              <span className='profile-text'>Fecha nacimiento: </span>
              <span className='profile-gold-text'>{invertirFecha(user?.birth_date)}</span>
              <span className='profile-text'>Email: </span>
              <span className='profile-gold-text'>{user?.email}</span>
              <span className='profile-text'>Teléfono: </span>
              <span className='profile-gold-text'>{user?.phone}</span>
              <span className='profile-text'>Dirección: </span>
              <span className='profile-gold-text'>{user?.address}</span>
              <span className='profile-text'>Código postal: </span>
              <span className='profile-gold-text'>{user?.zip_code}</span>
              <span className='profile-text'>Ciudad: </span>
              <span className='profile-gold-text'>{user?.city}</span>
              <span className='profile-text'>Provincia: </span>
              <span className='profile-gold-text'>{user?.province}</span>
            </div>

            {/* botonera */}
            <div className='d-flex justify-content-center gap-3 botones-prof'>
            <Button onClick={showModal} >Editar</Button>
            <Button variant="danger" onClick={erase}>Borrar</Button>
            </div>
          </div>

        {/* editar perfil */}
          <ModalBasico show={show} handleClose={showModal} title="Edición usuario" >
            <EditUser handleClose={showModal} user_id={user?.user_id} />
          </ModalBasico>
        </Col>
        
        {/* curso */}
        <Col md={6} lg={8} className='sd-custom md-custom profile-col'>
          {user.type===2?
          <div className='d-flex flex-column align-items-center justify-content-center gap-5 course-ppal'>           
            <div className='div-carousel'>
              <h3>Mis cursos</h3>
              <AllCoursesOneUserEnroll />
            </div>
            <div className='div-carousel'>
              <h3>Mis cursos creados</h3>
              <AllCoursesOneUserCreate />
            </div>           
          </div>
          :
          <div className='d-flex flex-column align-items-center justify-content-center gap-5 course-ppal'>           

            <div className='div-carousel'>
              <h3>Mis cursos creados</h3>
              <AllCoursesOneUserCreate />
            </div>           
          </div>
          }
        </Col>
      </Row>
    </section> 
  )
}
