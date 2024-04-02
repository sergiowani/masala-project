const bcrypt=require('bcrypt')
const connection = require('../config/db')
const jwt=require('jsonwebtoken')
require('dotenv').config()

class courseControllers{

  allCourses = (req, res) =>{


    let sql = `SELECT c.*, CONCAT_WS(' ',u.name, u.lastname) AS profesor FROM course c JOIN user u ON c.creator_user_id = u.user_id GROUP BY c.course_id;`
    
    connection.query(sql, (err, result)=>{
          // console.log(result);
          // console.log(err);
        err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  allCoursesService=(req, res)=>{
    let sql = 'SELECT * from course WHERE is_deleted=0 AND is_visible=1 AND is_disabled=0;'

    
    connection.query(sql, (err, result)=>{
          // console.log(result);
          // console.log(err);
        err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  allCoursesOneUserEnroll = (req, res) => {
    const { user_id } = req.params;
    //console.log(req.params);
  
    let sql = `
        SELECT course.*
        FROM course
        JOIN register ON course.course_id = register.course_id
        JOIN user ON user.user_id = register.user_id
        WHERE course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled = 0 AND user.user_id = ${user_id}
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        // Extraer los IDs de los profesores
        const profesorIds = result.map((curso) => curso.creator_user_id);
  
        // Consultar todos los datos de los profesores asociados a los cursos
        let sql2 = `
          SELECT user.* FROM user WHERE user.user_id IN (${profesorIds.join(',')}) GROUP BY user.user_id;
        `;
  
        connection.query(sql2, (err2, teachersResult) => {
          if (err2) {
            res.status(500).json(err2);
          } else {
            // Crear un objeto de respuesta que contenga la información de los cursos y profesores
            const response = {
              courses: result,
              teachers: teachersResult,
            };
  
            // Enviar la respuesta al cliente
            res.status(200).json(response);
            //console.log(response);
          }
        });
      }
    });
  };

  createCourse = (req, res) => {
    try {
      const { name, duration, price, description, creator_user_id } = JSON.parse(req.body.CrCourse);
      const tags = JSON.parse(req.body.tags) 
      // console.log("tags" ,tags);
      const courseImg = req.file ? req.file.filename : null;
  
      let sql;
      let values;
  
      if (courseImg) {
        // Si hay una imagen, incluir la columna course_img en la consulta
        sql = `INSERT INTO course (name, duration, price, description, creator_user_id, course_img) VALUES (?, ?, ?, ?, ?, ?)`;
        values = [name, duration, price, description, creator_user_id, courseImg];
      } else {
        // Si no hay imagen, omitir la columna course_img en la consulta
        sql = `INSERT INTO course (name, duration, price, description, creator_user_id) VALUES (?, ?, ?, ?, ?)`;
        values = [name, duration, price, description, creator_user_id];
      }
  
      // Ejecutar la consulta SQL
      connection.query(sql, values, (error, result) => {
        if (error) {
          console.error("Error al insertar curso:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          const courseId = result.insertId;
          let sqlTags
          tags.forEach(element => {
            sqlTags = `INSERT INTO course_tag (course_id, tag_id) VALUES (${courseId}, ${element})`
            connection.query(sqlTags, (err, result) =>{
              if(err){
                console.log(err);
              }
            })
            
          });



          if (courseImg) {
            // Si hay una imagen, insertarla en la base de datos
            let imgSql = `UPDATE course SET course_img = ? WHERE course_id = ?`;
            let imgValues = [courseImg, courseId];
            connection.query(imgSql, imgValues, (imgError, imgResult) => {
              if (imgError) {
                console.error("Error al actualizar imagen del curso:", imgError);
                res.status(500).json({ error: "Error interno del servidor" });
              } else {
                res.status(200).json({ course_id: courseId });
              }
            });
          } else {
            // Si no hay imagen, enviar respuesta directamente
            res.status(200).json({ course_id: courseId });
          }
        }
      });
    } catch (error) {
      console.error("Error en el controlador createCourse:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }


  };
  

  allCoursesOneUserCreate = (req, res) => {
    const { user_id } = req.params;
  
    let sql = `
      SELECT * FROM course WHERE creator_user_id = ${user_id} GROUP BY course_id

    `;
  
    connection.query(sql, (err, courses) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const cursosIds = courses.map((curso) => curso.course_id);
  
        const results = {};
  
        // Itera sobre los cursos
        for (const courseId of cursosIds) {
          const sql2 = `
            SELECT DISTINCT user.* FROM user JOIN register ON user.user_id = register.user_id  WHERE register.course_id = ${courseId}
          `;
  
          // Ejecuta la consulta y almacena los resultados en el objeto
          connection.query(sql2, (err2, students) => {
            if (err2) {
              res.status(500).json(err2);
            } else {
              results[courseId] = {
                course: courses.find((curso) => curso.course_id === courseId),
                students,
              };
  
              // Verifica si se han completado todas las consultas y envía la respuesta al cliente
              if (Object.keys(results).length === cursosIds.length) {
                res.status(200).json(results);
                //console.log(results);
              }
            }
          });
        }
      }
    });
  };
  

  detailsCourse = async (req, res) => {
    try {
      const { course_id } = req.params;
  
      // Primera consulta SQL
      const sql1 = `SELECT c.*, u.email, concat_ws(' ', u.name, u.lastname)as profesor FROM course c, user u WHERE c.is_deleted = 0 AND c.is_disabled = 0 AND c.course_id = ${course_id} AND c.creator_user_id=u.user_id;`;
      const result1 = await connection.promise().query(sql1);
  
      // Segunda consulta SQL
      const sql2 = `SELECT subject.* FROM subject WHERE course_id = ${course_id}`
      const result2 = await connection.promise().query(sql2);
  
      // Tercera consulta SQL
      const sql3 = `SELECT resource.* FROM resource, course WHERE resource.course_id = course.course_id AND course.course_id = ${course_id}`;
      const result3 = await connection.promise().query(sql3);

      // Resultados
      const response = {
        result1: result1[0][0], // solo la primera posición
        result2: result2[0],    // array completo de subjects
        result3: result3[0],     // array completo de resource
      };
  
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

  allCoursesReg2 = (req, res)=>{
    let sql=`SELECT c.name as course_name , c.*, u.name as profesor_name
    FROM course c , user u 
    WHERE c.creator_user_id = u.user_id`
    connection.query(sql, (err, result)=>{
      // console.log(result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }


  getSubjects =(req,res)=>{
    const { course_id } = req.params;
   
    let sql=`SELECT c.name as course_name , s.*, CONCAT_WS(' ', u.name, u.lastname )as profesor_name
    FROM subject s, course c, user u
      WHERE c.creator_user_id = u.user_id AND s.course_id = c.course_id AND s.course_id=${course_id};`
    
    connection.query(sql, (err, result)=>{
      // console.log(result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  oneCourse = (req, res) =>{
    const {course_id} = req.params;
    const sql = `SELECT * FROM course WHERE is_deleted = 0 AND is_disabled = 0 AND course_id = ${course_id}`;
    connection.query(sql, (err,result)=>{
      err?res.status(500).json(err): res.status(200).json(result)
    })
  }

  allCoursesProfile = (req, res) =>{

    const {user_id} = req.params;
    

    let sql = `SELECT * FROM course WHERE course_id NOT IN (SELECT register.course_id FROM register WHERE register.user_id = ${user_id} ) AND course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled= 0 AND course.creator_user_id != ${user_id};`


    
    connection.query(sql, (err, result)=>{
          // console.log(result);
          // console.log(err);
        err?res.status(500).json(err):res.status(200).json(result)
   })
  }
  
addSubject = (req, res)=>{
    const {course_id}=req.params;
    const {name, duration}=req.body

    let sql= `INSERT INTO subject (subject_id, course_id, name, duration)
    SELECT COALESCE(MAX(subject_id) + 1, 1), ${course_id}, "${name}", ${duration}
    FROM subject;`

    connection.query(sql, (err, result)=>{
     console.log(result);
      console.log(err)
     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  activate=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_deleted=0 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  
  getGrades = (req,res)=>{
    const { user_id, course_id } = req.params;
    //console.log(req.params);
   
    let sql=`SELECT * FROM register WHERE user_id = ${user_id} and course_id = ${course_id};`
    //console.log(sql);
    
    connection.query(sql, (err, result)=>{
      // console.log(result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  setGrades = (req, res) => {
    const { user_id, course_id } = req.params;
    const { status } = req.body; // Se espera que el nuevo estado se envíe en el cuerpo de la solicitud
  
    let sql = ` UPDATE register SET status = ${status} WHERE user_id = ${user_id} AND course_id = ${course_id};`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        // console.log(result);
        res.status(200).json({ message: "Estado actualizado exitosamente" });
      }
    });
  };
  
  deactivate=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_deleted=1 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  visible=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_visible=0 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  invisible=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_visible=1 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  enable=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_disabled=0 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  disable=(req,res)=>{
    const{id}=req.body
    let sql=`UPDATE course SET is_disabled=1 WHERE course_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  editOneCourse = (req, res) => {
    const {name, duration, price, description} = JSON.parse(req.body.editCourse)
    const {course_id} = req.body
    const tags = JSON.parse(req.body.tags)
    // console.log(req.body);

    let img = ""
    
    if(req.file != undefined){
      img = `, course_img = "${req.file.filename}"`
    } 
    let priceFloat = parseFloat(price);

    let sql = `UPDATE course SET name = "${name}", duration = "${duration}", price = ${priceFloat}, description = "${description}" ${img} WHERE course_id = ${course_id}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let sqlBorrarTags = `DELETE FROM course_tag WHERE course_id = ${course_id}`
        connection.query(sqlBorrarTags, (errDelete, result)=> {
          if(errDelete){
            res.status(500).json(errDelete)
          }
          else{
            let sqlNewTags
            tags.forEach(element => {
              sqlNewTags = `INSERT INTO course_tag (course_id, tag_id) VALUES (${course_id}, ${element.value})`
              connection.query(sqlNewTags, (errNewTags) => {
                if(errNewTags){
                  res.status(500).json(errNewTags)
                }
              })
            });
          }
        })
        res.status(200).json({result, newImg: req.file?.filename});
      } 
    });
  }

  checkCourses = (req,res)=>{
    const{user_id} = req.body
    let sql = `SELECT * FROM register WHERE user_id = ${user_id} AND course_id IS NOT NULL`;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  delOneCourses = (req,res)=>{
    const{course_id} = req.params
    // console.log(req.params);

    let sql = `UPDATE course SET is_deleted = 1 WHERE course_id = ${course_id}`;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  delOneSubject = (req,res)=>{
    const { course_id, subject_id } = req.params;
    // console.log(req.params);

    let sql = `DELETE FROM subject WHERE course_id = ${course_id} AND subject_id = ${subject_id}`;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  uploadResource = (req, res) => {
    const { course_id, subject_id } = req.params;
    const fileType = req.body.fileType;
    let typeNum = parseInt(fileType)
    //console.log(req.params);
    //console.log(req.file.filename);
    //console.log(typeof fileType);
  
    // Verificar si ya existe un registro con el mismo course_id y subject_id
    let sqlCheck = `SELECT * FROM resource WHERE course_id = ${course_id} AND subject_id = ${subject_id}`;
  
    connection.query(sqlCheck, (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        // Si hay resultados, significa que ya existe un registro con esos IDs, entonces hacemos un UPDATE
        if (results.length > 0) {
          let sqlUpdate = `UPDATE resource SET path = "${req.file.filename}" WHERE course_id = ${course_id} AND subject_id = ${subject_id}`;
          connection.query(sqlUpdate, (err, result) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(result);
            }
          });
        } else {
          // Si no hay resultados, significa que no existe un registro con esos IDs, entonces hacemos un INSERT
          let sqlInsert = `INSERT INTO resource SET course_id = ${course_id}, subject_id = ${subject_id}, type = ${typeNum}, path = "${req.file.filename}"`;
          connection.query(sqlInsert, (err, result) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(result);
            }
          });
        }
      }
    }); 
  };

  getFilename = (req, res)=>{
    const { course_id, subject_id } = req.params;

    let sql=`SELECT path, subject_id FROM resource WHERE course_id = ${course_id}`

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }


  createTag = (req, res) => {
    const  name  = req.body.name
    // console.log(name)
    
    let sql=`INSERT INTO tag (tag_id, name)
             SELECT COALESCE(MAX(tag_id)+1,1), "${name}"
             FROM tag;`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    }); 
}


  getSearch = (req, res) => { //ARREGLAR
    const { category, text } = req.params;
    const {user_id} = req.query;
    //console.log("AQUIII", req.params);
    //console.log("aqui", req.query);

    let sql;
    // Verificamos si la categoría es "tag" o "course"
    if (category === 'tag') {
        // Si la categoría es "tag", construimos la consulta para buscar en la tabla de tags
        sql = `SELECT course.* FROM course, tag, course_tag WHERE course.course_id = course_tag.course_id 
          AND course_tag.tag_id = tag.tag_id AND tag.name LIKE '%${text}%' AND course.course_id NOT IN (
            SELECT register.course_id FROM register WHERE register.user_id = ${user_id}) AND course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled = 0 AND course.creator_user_id != ${user_id}`;
    } else if (category === 'course') {
        // Si la categoría es "course", construimos la consulta para buscar en la tabla de cursos
        sql = `SELECT * FROM course WHERE name LIKE '%${text}%' AND course_id NOT IN (SELECT register.course_id FROM register WHERE register.user_id = ${user_id} ) AND course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled= 0 AND course.creator_user_id != ${user_id};`;
    } else {
        // Manejar cualquier otro caso aquí, si es necesario
        return res.status(400).json({ error: 'Categoría no válida' });
    }

    // Ejecutamos la consulta SQL correspondiente
    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(result);
        }
    });
  };

  getTags = (req, res)=>{
    let sql = 'SELECT * FROM tag';

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  getTagsEdit = (req, res) => {
    const {course_id} = req.params
    // console.log("AQUI", req.params);
    let sql = `SELECT tag.name AS label, tag.tag_id AS value FROM tag, course_tag WHERE tag.tag_id = course_tag.tag_id AND course_tag.course_id = ${course_id} `

    connection.query(sql, (err, result)=>{
      // console.log(result);
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  allStudentsJoin = (req, res) =>{
    const {course_id}=req.params
    let sql = `SELECT concat_ws(" ", u.name, u.lastname) as fullname FROM user u, register r WHERE r.course_id=${course_id} and r.user_id = u.user_id;`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
}


module.exports = new courseControllers;