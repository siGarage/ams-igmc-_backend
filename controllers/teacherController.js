import TEACHER from "../models/teacherModel.js";
import Validator from "validatorjs";
import reply from '../common/reply.js';

export default {

    //Teacher create
    async createTeacher(req, res) {
        try {
            let request = req.body;
            let exist = await TEACHER.findOne({ "email": request.email });
            if (exist) {
                return res.status(403).send({ message: 'This email is already exists!' });
            }
            let teacher = await TEACHER.create(request);
            return res.status(201).send({ teacher: teacher, message: "Teacher created successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Get Teacher List
    async getTeacherList(req, res) {
        try {
            let students = await TEACHER.find();
            return res.status(200).json(students);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Delete Teacher
    async deleteTeacher(req, res) {
        try {
            let id = req.body.id;
            const teacher = await TEACHER.findByIdAndRemove(id);
            if (!teacher) {
                return res.status(404).send({ message: "Teacher not found." })
            }
            return res.status(204).send({ id: id, message: "Teacher deleted successfully." })
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },

    //Update Teacher
    // async updateStudent(req, res) {
    //     try {
    //         let request = req.body;
    //         const image = req?.file?.filename;
    //         if (!request) {
    //             return res.json(reply.failed("All input is required"));
    //         }
    //         const examMain = await Exam.findById({ _id: req.body.id });
    //         if (!examMain) {
    //             return res.json(reply.failed("Exam not found!!"))
    //         }
    //         var exam = await Exam.findOneAndUpdate(
    //             { _id: req.body.id },
    //             {
    //                 $set: {
    //                     image: image,
    //                     name: req.body.name,
    //                     description: req.body.description,
    //                     elg_class: req.body.elg_class,
    //                     elg_dob: req.body.elg_dob,
    //                     admission_process: req.body.admission_process,
    //                     language: req.body.language,
    //                     examSeats: req.body.examSeats,
    //                     date_exam: req.body.date_exam,
    //                     shortName: req.body.shortName
    //                 },
    //             }
    //         );
    //         if (exam) {
    //             return res.status(200).send({ "exam": exam, message: "Exam updated successfully." });
    //         }
    //         return res.status(200).send({users: request, message: "Exam updated successfully." });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send(err)
    //     }
    // }

}