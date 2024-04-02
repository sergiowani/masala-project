var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const multer= require('../middlewares/multerSingle');
const multer2= require('../middlewares/multerSingleResource');

const verify = require('../middlewares/TokenVerify');

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.put('/verifyUser',verify, userControllers.confirmUser)

router.get('/getOneUser/:id', userControllers.getOneUser);

//no es dinámica porque nos traemos el id del front
router.put('/editUser', multer("users"), userControllers.editUser);

router.get('/allUsers', userControllers.allUsers);

router.put('/activate', userControllers.activate)

router.put('/deactivate', userControllers.deactivate)

router.put('/typeAdmin', userControllers.typeAdmin)

router.put('/typeUser', userControllers.typeUser)

router.put('/enable', userControllers.enable)

router.put('/disable', userControllers.disable)

router.get('/allCreatedCourse/:user_id', userControllers.allCreatedCourse)

router.get('/allCourses/:user_id', userControllers.allCourses)

router.put('/adminReg/:user_id', userControllers.adminReg)

router.put('/adminDereg/:user_id', userControllers.adminDereg)

router.post('/changePassword', userControllers.changePassword)

//no es dinámica porque nos traemos el id del front
router.put('/deleteUser', userControllers.deleteUser);


router.put('/upExam/:user_id/:course_id', multer2(),userControllers.upExam)

router.get('/myGrades', userControllers.getMyGrades);


module.exports = router;
