import STUDENT from "../models/studentModel.js";


export default {

    //Student create
    async createStudent(req, res) {
        try {
            let request = req.body;
            let exist = await STUDENT.findOne({ "email": request.email });
            if (exist) {
                return res.status(403).send({ message: 'This student email is already exists!' });
            }
            let student = await STUDENT.create(request);
            return res.status(200).send({ student: student, message: "Student created successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Get Student List
    async getStudentList(req, res) {
        try {
            let students = await STUDENT.find();
            return res.status(200).json(students);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Delete Student
    async deleteStudent(req, res) {
        try {
            let id = req.query.id;
            const student = await STUDENT.findByIdAndRemove(id);
            if (!student) {
                return res.status(404).send({ message: "Student not found." })
            }
            return res.status(200).send({ id: id, message: "Student deleted successfully." })
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },

    //Update Student
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