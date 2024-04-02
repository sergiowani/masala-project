const bcrypt=require('bcrypt')
const connection = require('../config/db')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const sendMyMail = require('../public/javascripts/nodemailer')

class UserControllers{
  
  register = (req, res) => {
    const { name, email, password } = req.body;

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return res.status(500).json({ error: "Error al generar la sal para el hash de la contraseña" });
        }

    bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
            return res.status(500).json({ error: "Error al generar el hash de la contraseña" });
        }
        
        let sql = `INSERT INTO user (name, email, password) VALUES ("${name}", "${email}", "${hash}")`;
        connection.query(sql, (error, result) => {

          if (error) {
              return res.status(500).json({ error: "Error al insertar el usuario en la base de datos" });
          }

          const token2 = jwt.sign({
              user: {
                  id: result.insertId,
              }
          },
              process.env.SECRET,
              { expiresIn: "3d" });

          const confirmationLink = `http://localhost:5173/verifyUser/${token2}`;



          sendMyMail('sergiowani@gmail.com',


          `<div>
          <p>
          Por favor, haz clic en el siguiente enlace para confirmar tu cuenta:
          Haz click aquí <a href='${confirmationLink}'>Pincha aquí</a>
          </p>
          </div>
          `,
          "Confirmación de cuenta"
          
          )
          .then(() => {
              res.status(200).json({token2, result});
          }).catch((err) => {
              return res.status(500).json({ err: "Error al enviar el correo electrónico de confirmación" });
          });
        });
      });
    });
  }


  

  login = (req, res)=>{
    const {email, password}= req.body
    let sql = `SELECT * FROM user WHERE email ="${email}" AND is_deleted=0 AND is_disabled = 0`
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }
      else if(!result || !result.length || result[0].is_deleted==1){
        res.status (401).json("Usuario no autorizado")
      }
      else{
        const hash = result[0].password;
        bcrypt.compare(password, hash, (errHash, response)=>{
          if(errHash){
            res.status(500).json(errHash)
          }
          if(response){
            //mandar token
            const token=jwt.sign({
              user: {
                id:result[0].user_id,
                // type:result[0].type
              }
            }, 
            process.env.SECRET,
            {expiresIn: "5d"})
            res.status(200).json({token, user:result[0]})
          }
          else{
            res.status(401).json("Usuario no autorizado")
          }
        })
      }
    })
  }

  confirmUser = (req, res) =>{
    // console.log(req.user);
    const user_id = req.user;

    let sql = `UPDATE user SET is_disabled = 0 WHERE user_id = ${user_id}`
    // console.log(user_id)

    connection.query(sql, (err, result) => {
      if(err){
        res.status(500).json(err)
      }
      else{
        res.status(200).json(result)
      }
    })
  } 

  getOneUser = (req, res) => {
    const {id} = req.params;

    let sql = `SELECT * FROM user WHERE user_id = ${id} AND is_deleted = 0 AND is_disabled = 0`;

    connection.query(sql, (err, result) => {
      if(err){
        res.status(500).json(err)
      }
      else{
        res.status(200).json(result[0])
      }
    })
  }

  editUser = (req, res) => {
    const {name, lastname, birth_date, dni, phone, address, zip_code, city, province, user_id} = JSON.parse(req.body.editUser)

    
    let img = ""
    
    if(req.file != undefined){
      img = `, user_img = "${req.file.filename}"`
    } 
    
    let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", birth_date = "${birth_date}", dni = "${dni}", phone = "${phone}", address = "${address}", zip_code = "${zip_code}", city = "${city}", province = "${province}" ${img} WHERE user_id = ${user_id}`;
  
    
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({result, newImg: req.file?.filename});
      } 
    });
    
  }

  allUsers= (req, res)=>{
    let sql = `SELECT * FROM user`
    connection.query(sql, (err, result)=>{
      

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  activate=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_deleted=0 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  deactivate=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_deleted=1 where user_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  typeAdmin=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET type=1 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  typeUser=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET type=2 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  enable=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_disabled=0 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  disable=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_disabled=1 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  allCreatedCourse=(req, res)=>{
    const {user_id}=req.params
    let sql = `SELECT name FROM course  WHERE creator_user_id = ${user_id};`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  allCourses = (req, res) => {
    const { user_id } = req.params;

    let sql = `
    SELECT c.*, COALESCE(r.status, 0) AS grade
    FROM course c
    LEFT JOIN register r ON c.course_id = r.course_id AND r.user_id = ${user_id}
    WHERE c.creator_user_id != ${user_id};`

        connection.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        });
  }

  adminReg =(req, res)=>{
    const {user_id}=req.params
    const {course_id}=req.body
    let sql=`INSERT INTO register (user_id, course_id) VALUES (${user_id}, ${course_id});`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  adminDereg =(req, res)=>{
    const {user_id}=req.params
    const {course_id}=req.body
    let sql=`DELETE FROM register WHERE user_id=${user_id} AND course_id=${course_id};`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }


  changePassword=(req, res)=>{
    const email=req.body.elem
    const password=req.body.newPass

    sendMyMail(`${email}`, `Tu contraseña nueva es: ${password}`, "Cambio de contraseña");

    let saltRounds=8;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err){
            res.status(500).json(err)
          }
          let sql=`UPDATE user SET password="${hash}" WHERE email="${email}"; `

          connection.query(sql, (error, result)=>{
            error?
              res.status (500).json(error)
              : res.status(200).json(result)
          })
      });
  });
    
    
 
  }

  deleteUser = (req,res)=>{
    const{user_id} = req.body
    //console.log(user_id);

     let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    }) 
  }


  upExam=(req,res)=>{
    const{user_id, course_id}=req.params
    // console.log(req.file.filename)
    let sql=`UPDATE register SET exam_path = "${req.file.filename}" WHERE user_id=${user_id} and course_id=${course_id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    }) 
  }

  getMyGrades = (req, res)=>{
    const {user_id}=req.query
    //console.log(req.query);
    let sql = `SELECT register.*, course.* FROM register, course WHERE register.course_id = course.course_id AND register.user_id = ${user_id};`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })

  }

}


module.exports = new UserControllers;