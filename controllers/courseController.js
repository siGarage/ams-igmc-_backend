import COURSE from "../models/courseModel.js";
import Validator from "validatorjs";
import reply from '../common/reply.js';


export default {

    //Course create
    async createCourse(req, res) {
        try {
            let request = req.body;
            if (Object.keys(request).length == 0) {
                return res.json(reply.failed("Name input is required!"));
            }
            let validation = new Validator(request, {
                name: 'required|string',
            });
            if (validation.fails()) {
                let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
                return res.json(reply.failed(validation.errors.first(err_key)));
            }
            let exist = await COURSE.findOne({ "name": request.name });
            if (exist) {
                return res.status(403).send({ message: 'This course is already exist.' });
            }
            let course = await COURSE.create(request);
            return res.status(201).send({course: course, message: "Course created successfully." });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Get Courses List
    async getCourseList(req, res) {
        try {
            const courses = await COURSE.find();
            return res.status(200).json(courses);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Delete Course
    async deleteCourse(req, res) {
        try {
            let id = req.body.id;
            const course = await COURSE.findByIdAndRemove(id);
            if (!course) {
                return res.status(404).send({ message: "Course not found." })
            }
            return res.status(200).send({ id: id, message: "Course deleted successfully." })
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }


}