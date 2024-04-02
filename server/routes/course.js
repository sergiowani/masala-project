var express = require('express');
const courseControllers = require('../controllers/courseControllers');
var router = express.Router();
const multer= require('../middlewares/multerSingle');
const multerResource = require('../middlewares/multerSingleResource')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/allCourses', courseControllers.allCourses)

router.get('/allCoursesService', courseControllers.allCoursesService)


router.get('/allCoursesProfile/:user_id', courseControllers.allCoursesProfile)

router.get('/allCoursesOneUserEnroll/:user_id', courseControllers.allCoursesOneUserEnroll)

router.get('/allCoursesOneUserCreate/:user_id', courseControllers.allCoursesOneUserCreate)

router.post('/createCourse',multer("course_img"), courseControllers.createCourse)

router.get('/details/:course_id', courseControllers.detailsCourse)

router.get('/subjects/:course_id', courseControllers.getSubjects)

router.post('/addSubject/:course_id', courseControllers.addSubject)


router.get('/grades/:user_id/:course_id', courseControllers.getGrades)

router.put('/grades/:user_id/:course_id', courseControllers.setGrades)


router.get('/oneCourse/:course_id', courseControllers.oneCourse)

router.put('/activate', courseControllers.activate)
router.put('/deactivate', courseControllers.deactivate)

router.put('/visible', courseControllers.visible)
router.put('/invisible', courseControllers.invisible)

router.put('/enable', courseControllers.enable)
router.put('/disable', courseControllers.disable)

//no es dinámica porque nos traemos el id del front
router.put('/editCourse', multer("course_img"), courseControllers.editOneCourse)

//no es dinámica porque nos traemos el id del front
router.post('/checkCourses', courseControllers.checkCourses)

router.put('/delCourse/:course_id', courseControllers.delOneCourses)


router.put('/delSubject/:course_id/:subject_id', courseControllers.delOneSubject)

router.put('/uploadFile/:course_id/:subject_id', multerResource(), courseControllers.uploadResource)

router.get('/filename/:course_id', courseControllers.getFilename)

router.post('/createTag', courseControllers.createTag)

router.get('/searchCourses/:category/:text', courseControllers.getSearch)

router.get('/tags', courseControllers.getTags)

router.get('/tagsEdit/:course_id', courseControllers.getTagsEdit)

router.get('/allStudentsJoin/:course_id', courseControllers.allStudentsJoin)

module.exports = router;
