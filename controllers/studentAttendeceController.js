import STUDENTATTENDENCE from "../models/studentAttendenceModel.js";
import Validator from "validatorjs";
import reply from '../common/reply.js';

export default {

    //Student Attendence create
    async createStudentAttendence(req, res) {
        try {
            let request = req.body;
            if (Object.keys(request).length == 0) {
                return res.json(reply.failed("All input is required!"));
            }
            let validation = new Validator(request, {
                subject_id: 'required',
                student_id: 'required',
                date: 'required',
                type: 'required'
            });
            if (validation.fails()) {
                let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
                return res.json(reply.failed(validation.errors.first(err_key)));
            }
            let exist = await STUDENTATTENDENCE.findOne({ subject_id: request.subject_id, student_id: request.student_id, date: request.date });
            if (exist) {
                return res.status(403).send({ message: 'This student attendence is already exists!' });
            }
            let studentAttendence = await STUDENTATTENDENCE.create(request);
            return res.status(201).send({ studentAttendence: studentAttendence, message: "Student Attendence created successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Get Student Attendence List
    async getStudentAttendenceList(req, res) {
        try {
            let studentAttendences = await STUDENTATTENDENCE.find();
            return res.status(200).json(studentAttendences);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Delete Student Attendence
    async deleteStudentAttendence(req, res) {
        try {
            let id = req.body.id;
            const studentAttendence = await STUDENTATTENDENCE.findByIdAndRemove(id);
            if (!studentAttendence) {
                return res.status(404).send({ message: "Student Attendence not found." })
            }
            return res.status(204).send({ id: id, message: "Student Attendence deleted successfully." })
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },

    // Update Student Attendence
    async updateStudentAttendence(req, res) {
        try {
            let request = req.body
            if (!request) {
                return res.send("All input is required!");
            }
            let _id = req.body.id;
            const studentAttendence = await STUDENTATTENDENCE.findById(_id);
            if (!studentAttendence) {
                return res.status(404).send({ message: "Student Attendence not found" });
            }
            await STUDENTATTENDENCE.findByIdAndUpdate(_id, request);
            return res.status(201).send({ message: "Student Attendence updated successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    },

    // Get Student Attendence By Id
    async getStudentAttendenceById(req, res) {
        try {
            const studentAttendence = await STUDENTATTENDENCE.findById(req.body.id);
            return res.status(200).json(studentAttendence);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

}