import express from "express";
import UserController from "../controllers/userController.js";
import Authentication from "../middleware/auth.js";
import GroupController from "../controllers/groupController.js";
import StudentController from "../controllers/studentController.js";
import TeacherController from "../controllers/teacherController.js";
import BiometricController from "../controllers/biometricController.js";
import DepartmentController from "../controllers/departmentController.js";
import SubjectController from "../controllers/subjectController.js";
import CourseController from "../controllers/courseController.js";
import SemesterController from "../controllers/semesterController.js";
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from "fs";


const Router = express.Router();
Router.use(bodyParser.json());

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'images');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   }
});

const upload = multer({ storage: storage })

// ##### User-Router #####

//USER CREATE
Router.post("/userCreate", UserController.userRegister);

//USER CREATE
Router.post("/userCreate", UserController.userRegister);

//USER LOGIN
Router.post("/userLogin", UserController.userLogin);

//LOGOUT
Router.delete('/logout', Authentication, UserController.logout);

//Forgot-Password
Router.put('/forget-password', UserController.forgetPassword);

//-----------------------------GROUP_ROUTES-------------------------//
//Create Group
Router.post("/createGroup", Authentication, GroupController.createGroup);

//Get Groups
Router.get("/getGroups", Authentication, GroupController.getGroupList);

//Delete Group
Router.delete("/deleteGroup", Authentication, GroupController.deleteGroup);

//-----------------------------STUDENT_ROUTES-------------------------//
//Create Student
Router.post("/createStudent", Authentication,upload.single('avatar'), StudentController.createStudent);

//Get Students
Router.get("/getStudents", Authentication, StudentController.getStudentList);

//Delete Student
Router.delete("/deleteStudent", Authentication, StudentController.deleteStudent);

//-----------------------------TEACHER_ROUTES-------------------------//
//Create Teacher
Router.post("/createTeacher", Authentication, TeacherController.createTeacher);

//Get Teachers
Router.get("/getTeachers", Authentication, TeacherController.getTeacherList);

//Delete Teacher
Router.delete("/deleteTeacher", Authentication, TeacherController.deleteTeacher);

//-----------------------------BIOMETRIC_ROUTES-------------------------//
//Create Biometric
Router.post("/createBiometric", Authentication, BiometricController.createBiometric);

//Get Biometrics
Router.get("/getBiometrics", Authentication, BiometricController.getBiometricList);

//Delete Biometric
Router.delete("/deleteBiometric", Authentication, BiometricController.deleteBiometric);

//-----------------------------DEPARTMENT_ROUTES-------------------------//
//Create Department
Router.post("/createDepartment", Authentication, DepartmentController.createDepartment);

//Get Departments
Router.get("/getDepartments", Authentication, DepartmentController.getDepartmentList);

//Delete Department
Router.delete("/deleteDepartment", Authentication, DepartmentController.deleteDepartment);

//-----------------------------SUBJECT_ROUTES-------------------------//
//Create Subject
Router.post("/createSubject", Authentication, SubjectController.createSubject);

//Get Subjects
Router.get("/getSubjects", Authentication, SubjectController.getSubjectList);

//Delete Subject
Router.delete("/deleteSubject", Authentication, SubjectController.deleteSubject);

//-----------------------------COURSE_ROUTES-------------------------//
//Create Semester
Router.post("/createCourse", Authentication, CourseController.createCourse);

//Get Courses
Router.get("/getCourses", Authentication, CourseController.getCourseList);

//Delete Semester
Router.delete("/deleteCourse", Authentication, CourseController.deleteCourse);

//-----------------------------SEMESTER_ROUTES-------------------------//
//Create Semester
Router.post("/createSemester", Authentication, SemesterController.createSemester);

//Get Semesters
Router.get("/getSemesters", Authentication, SemesterController.getSemesterList);

//Delete Semester
Router.delete("/deleteSemester", Authentication, SemesterController.deleteSemester);

export default Router;