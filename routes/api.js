import express from "express";
import UserController from "../controllers/userController.js";
import Authentication from "../middleware/auth.js";
import GroupController from "../controllers/GroupController.js";
// import statusController from "../controllers/statusController.js";
import multer from 'multer';
import bodyParser from 'body-parser';
// import PropertyTypeController from "../controllers/propertyTypeController.js";
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

//Create Group
Router.post("/createGroup", Authentication, GroupController.createGroup);

//Get Group
Router.get("/getGroup", Authentication, GroupController.getGroup);

//Delete Group
Router.delete("/deleteGroup", Authentication, GroupController.deleteGroup);


export default Router;