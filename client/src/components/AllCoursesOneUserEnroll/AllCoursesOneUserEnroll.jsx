import React, { useContext, useEffect, useState } from 'react';
import { MasalaContext } from '../../Context/MasalaProvider';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './allCoursesOneUserEnroll.scss';
import Card from 'react-bootstrap/Card';

const Slide = ({ imagePath, title, caption, aref }) => (
  <Card className='slide-container'>
    <Card.Img variant="top" src={imagePath} alt="foto curso" />
    <Card.Body className="caption-container">
      <Card.Title className='title-carousel'>{title}</Card.Title>
	    <Card.Text className='text-carousel'>
        Profesor: {caption}
      </Card.Text>
	    <Link to={aref}>Abrir curso</Link>
    </Card.Body>
  </Card>
);

export const AllCoursesOneUserEnroll = () => {
  const { user } = useContext(MasalaContext);
  const [allCoursesOneUser, setAllCoursesOneUser] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const isLargeScreen = useMediaQuery({ minWidth: 1500 });
  const isMediumScreen = useMediaQuery({ minWidth: 1300 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesExist = await checkCoursesExistence();
        if (coursesExist) {
          const { courses, teachers } = await fetchAllCourses();
          setAllCoursesOneUser(courses);
          setAllTeachers(teachers);
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    const checkCoursesExistence = async () => {
      const response = await axios.post('http://localhost:3000/course/checkCourses', {
        user_id: user.user_id,
      });
      return response.data.length > 0;
    };

    const fetchAllCourses = async () => {
      const res = await axios.get(`http://localhost:3000/course/allCoursesOneUserEnroll/${user.user_id}`);
      return res.data;
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const itemsToShow = () => {
    let items;
    if (isLargeScreen) {
      items = 3;
    } else if (isMediumScreen) {
      items = 2;
    } else {
      items = 1;
    }
    return items;
  };

  return (
    <div>
      {allCoursesOneUser && allCoursesOneUser.length > 0 ? (
        <Carousel className="carousel-item-container">
          {[...Array(Math.ceil(allCoursesOneUser.length / itemsToShow()))].map((_, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="d-flex justify-content-center gap-5 slide-group">
                {allCoursesOneUser.slice(groupIndex * itemsToShow(), (groupIndex + 1) * itemsToShow()).map(curso => (
                  <Slide
                    key={curso.course_id}
                    imagePath={curso.course_img
                      ? `http://localhost:3000/images/course_img/${curso.course_img}`
                      : "/images/course.png"
                    }
                    title={curso.name}
                    caption={allTeachers.find(teacher => teacher.user_id === curso.creator_user_id)?.name}
                    aref={`/mycourse/${curso.course_id}`}
                  />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>No estás apuntado a ningún curso.</div>
      )}
    </div>
  );
};
