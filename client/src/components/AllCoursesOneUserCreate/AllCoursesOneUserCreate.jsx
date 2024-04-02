import React, { useContext, useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MasalaContext } from '../../Context/MasalaProvider';
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { AllStudentITeach } from '../AllStudentITeach/AllStudentITeach';
import { useMediaQuery } from 'react-responsive';
import './allCoursesOneUserCreate.scss';
import Card from 'react-bootstrap/Card';

const Slide = ({ imagePath, title, onClick, aref, caption, caption2, caption3 }) => (
  <Card className='slide-container'>
      <Card.Img variant="top" src={imagePath} alt="foto curso" />
      <Card.Body className="caption-container">
        <Card.Title className='title-carousel'>{title}</Card.Title>
	      <Link onClick={onClick}>Ver alumnos</Link>
        <br />
        <Link to={aref}>Abrir curso</Link>
        <Card.Text className='text-carousel'>
        {caption}{caption2}{caption3}
       </Card.Text>
      </Card.Body>
    </Card>
);

export const AllCoursesOneUserCreate = () => {
  const { user } = useContext(MasalaContext);
  const [show, setShow] = useState(false);
  const [courseId, setCourseId] = useState();
  const [coursesArray, setCoursesArray] = useState([]);
  const isLargeScreen = useMediaQuery({ minWidth: 1500 });
  const isMediumScreen = useMediaQuery({ minWidth: 1300 });

  const updateCoursesArray = async () => {
    if (user) {
      try {
        const res = await axios.get(`http://localhost:3000/course/allCoursesOneUserCreate/${user.user_id}`);
        const coursesArray = Object.values(res.data);
        setCoursesArray(coursesArray);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    updateCoursesArray();
  }, [user]);

  const showModal = () => {
    setShow(!show);
  };

  // Definir la cantidad de elementos a mostrar en cada pantalla
  const slidesToShow = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;

  // Agrupar los cursos según la cantidad de elementos a mostrar en cada pantalla
  const groupedCourses = [];
  for (let i = 0; i < coursesArray.length; i += slidesToShow) {
    groupedCourses.push(coursesArray.slice(i, i + slidesToShow));
  }

  return (
    <div>
      {coursesArray && coursesArray.length > 0 ? (
        <Carousel className="carousel-item-container">
          {groupedCourses.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center gap-5 slide-group">
              {group.map(({course}) => (
                <Slide
                  key={course.course_id}
                  imagePath={course.course_img ? `http://localhost:3000/images/course_img/${course.course_img}` : "/images/course.png"}
                  title={course.name}
                  onClick={() => {
                    showModal();
                    setCourseId(course.course_id);
                  }}
                  aref={`/mycourse/${course.course_id}`}
                  caption={course.is_deleted === 1 ? "❌" : ""}
                  caption2={course.is_disabled === 1 ? "⛔" : ""}
                  caption3={course.is_visible === 0 ? "👁‍🗨" : ""}
                />
              ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>No has creado ningún curso.</div>
      )}
      <ModalBasico show={show} handleClose={showModal} size="lg" title="Alumnos del curso">
        {courseId && (
          <AllStudentITeach
            handleClose={showModal}
            allStudents={coursesArray
              .flat()
              .find(({ course }) => course.course_id === courseId)?.students || []
            }
            courseId={courseId}
          />
        )}
      </ModalBasico>
    </div>
  );
};
