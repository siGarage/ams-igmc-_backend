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
import StudentAttendenceController from "../controllers/studentAttendeceController.js";
import TeacherAttendenceController from "../controllers/teacherAttendenceController.js";
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

//Update Group
Router.put("/updateGroup", Authentication, GroupController.updateGroup);

//Get Group By Id
Router.post("/getGroupById", Authentication, GroupController.getGroupById);

//-----------------------------STUDENT_ROUTES-------------------------//
//Create Student
Router.post("/createStudent", Authentication, upload.single('avatar'), StudentController.createStudent);

//Get Students
Router.get("/getStudents", Authentication, StudentController.getStudentList);

//Delete Student
Router.delete("/deleteStudent", Authentication, StudentController.deleteStudent);

//Get Student By Id
Router.post("/getStudentById", Authentication, StudentController.getStudentById);
//-----------------------------TEACHER_ROUTES-------------------------//
//Create Teacher
Router.post("/createTeacher", Authentication, TeacherController.createTeacher);

//Get Teachers
Router.get("/getTeachers", Authentication, TeacherController.getTeacherList);

//Delete Teacher
Router.delete("/deleteTeacher", Authentication, TeacherController.deleteTeacher);

//Get Teacher By Id
Router.post("/getTeacherById", Authentication, TeacherController.getTeacherById);
//-----------------------------BIOMETRIC_ROUTES-------------------------//
//Create Biometric
Router.post("/createBiometric", Authentication, BiometricController.createBiometric);

//Get Biometrics
Router.get("/getBiometrics", Authentication, BiometricController.getBiometricList);

//Delete Biometric
Router.delete("/deleteBiometric", Authentication, BiometricController.deleteBiometric);

//Update Biometric
Router.put("/updateBiometric", Authentication, BiometricController.updateBiometric);

//Get Biometric By Id
Router.post("/getBiometricById", Authentication, BiometricController.getBiometricById);

//-----------------------------DEPARTMENT_ROUTES-------------------------//
//Create Department
Router.post("/createDepartment", Authentication, DepartmentController.createDepartment);

//Get Departments
Router.get("/getDepartments", Authentication, DepartmentController.getDepartmentList);

//Delete Department
Router.delete("/deleteDepartment", Authentication, DepartmentController.deleteDepartment);

//Update Department
Router.put("/updateDepartment", Authentication, DepartmentController.updateDepartment);

//Get Department By Id
Router.post("/getDepartmentById", Authentication, DepartmentController.getDepartmentById);
//-----------------------------SUBJECT_ROUTES-------------------------//
//Create Subject
Router.post("/createSubject", Authentication, SubjectController.createSubject);

//Get Subjects
Router.get("/getSubjects", Authentication, SubjectController.getSubjectList);

//Delete Subject
Router.delete("/deleteSubject", Authentication, SubjectController.deleteSubject);

//Update Subject
Router.put("/updateSubject", Authentication, SubjectController.updateSubject);

//Get Subject By Id
Router.post("/getSubjectById", Authentication, SubjectController.getSubjectById);

//-----------------------------COURSE_ROUTES-------------------------//
//Create Courses
Router.post("/createCourse", Authentication, CourseController.createCourse);

//Get Courses
Router.get("/getCourses", Authentication, CourseController.getCourseList);

//Delete Courses
Router.delete("/deleteCourse", Authentication, CourseController.deleteCourse);

//Update Courses
Router.put("/updateCourse", Authentication, CourseController.updateCourse);

//Get Courses By Id
Router.post("/getCourseById", Authentication, CourseController.getCourseById);

//-----------------------------SEMESTER_ROUTES-------------------------//
//Create Semester
Router.post("/createSemester", Authentication, SemesterController.createSemester);

//Get Semesters
Router.get("/getSemesters", Authentication, SemesterController.getSemesterList);

//Delete Semester
Router.delete("/deleteSemester", Authentication, SemesterController.deleteSemester);

//Update Semester
Router.put("/updateSemester", Authentication, SemesterController.updateSemester);

//Get Semester By Id
Router.post("/getSemesterById", Authentication, SemesterController.getSemesterById);

//-----------------------------STUDENT_ATTENDENCE_ROUTES-------------------------//
//Create Student Attendence
Router.post("/createStudentAttendence", Authentication, StudentAttendenceController.createStudentAttendence);

//Get Student Attendences
Router.get("/getStudentAttendences", Authentication, StudentAttendenceController.getStudentAttendenceList);

//Delete Student Attendence
Router.delete("/deleteStudentAttendence", Authentication, StudentAttendenceController.deleteStudentAttendence);

//Update Student Attendence
Router.put("/updateStudentAttendence", Authentication, StudentAttendenceController.updateStudentAttendence);

//Get Student Attendence By Id
Router.post("/getStudentAttendenceById", Authentication, StudentAttendenceController.getStudentAttendenceById);


//-----------------------------TECAHER_ATTENDENCE_ROUTES-------------------------//
//Create Student Attendence
Router.post("/createTeacherAttendence", Authentication, TeacherAttendenceController.createTeacherAttendence);

//Get Teacher Attendences
Router.get("/getTeacherAttendences", Authentication, TeacherAttendenceController.getTeacherAttendenceList);

//Delete Teacher Attendence
Router.delete("/deleteTeacherAttendence", Authentication, TeacherAttendenceController.deleteTeacherAttendence);

//Update Teacher Attendence
Router.put("/updateTeacherAttendence", Authentication, TeacherAttendenceController.updateTeacherAttendence);

//Get Teacher Attendence By Id
Router.post("/getTeacherAttendenceById", Authentication, TeacherAttendenceController.getTeacherAttendenceById);

export default Router;