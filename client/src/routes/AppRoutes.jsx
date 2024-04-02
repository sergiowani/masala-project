import React, { useContext } from 'react'
import { Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Register } from '../pages/Auth/Register/Register'
import { Login } from '../pages/Auth/Login/Login'
import { NavBarApp } from '../components/NavBarApp/NavBarApp'
import { Home } from '../pages/Home/Home'
import { Footer } from '../components/Footer/Footer'
import { Who } from '../pages/Who/Who'
import { Servicios } from '../pages/Servicios/Servicios'
import { UserProfile } from '../pages/UserProfile/UserProfile'
import { AdminUsers } from '../pages/Admin/Users/AdminUsers'
import { MyCourse } from '../pages/MyCourse/MyCourse'
import { AdminCourse } from '../pages/Admin/Course/AdminCourse'
import { AdminSubject } from '../pages/Admin/Subject/AdminSubject'
import { AllCoursesProfile } from '../pages/AllCoursesProfile/AllCoursesProfile'
import { OneCourse } from '../pages/Cursos/OneCourse'
import { MasalaContext } from '../Context/MasalaProvider'
import { ConfirmUser } from '../pages/Auth/ConfirmUser/ConfirmUser'
import { Confirm } from '../pages/Auth/Confirm/Confirm'
import { TipoServicios } from '../pages/Servicios/TipoServicios/TipoServicios'
import { MyGrades } from '../pages/MyGrades/MyGrades'
import { Forbidden } from '../pages/Auth/Forbidden/Forbidden'



export const AppRoutes = () => {
  const {user}=useContext(MasalaContext);
  return (
    <>
      <header>
        <nav>
          <NavBarApp />
        </nav>
      </header>
      <Container fluid>
        <main>
          <Routes>
            {!user && <>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            </>}

            <Route path="*" element={<Forbidden />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/who' element={<Who />}/>
            <Route path='/about' element={<h1>ABOUT</h1>} />
            <Route path='/servicios' element={<Servicios/>} />
            <Route path='/tipoServicios' element={<TipoServicios/>} />
            <Route path='/confirmation' element={<ConfirmUser/>} />
            <Route path='/verifyUser/:token2' element={<Confirm/>} />



        {user && <>
            {user?.type === 2 && 
            <>
            <Route path="/mycourse/:course_id" element={<MyCourse />}/>
            <Route path="/oneCourse/:course_id" element={<OneCourse />}/>
            <Route path='/subjects/:course_id' element={<AdminSubject/>} />
            <Route path='/profile' element={<UserProfile />}/>
            <Route path='/allCoursesProfile/:user_id' element={(<AllCoursesProfile/>)} />
            <Route path='/myGrades' element={<MyGrades />}/>
            </>
            }
            {user?.type === 1 &&
            <>

            <Route path='/profile' element={<UserProfile />}/>
            <Route path='/subjects/:course_id' element={<AdminSubject/>} />
            <Route path='/allCourses' element={<AdminCourse/>} />
            <Route path='/allUsers' element={<AdminUsers/>} />
            <Route path="/mycourse/:course_id" element={<MyCourse />}/>

            </>
            }

        </>
        }

          </Routes>
        </main>
        <footer id='footer'>
              <Footer />
        </footer>
      </Container>
    </>
  )
}