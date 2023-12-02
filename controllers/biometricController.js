import BIOMETRIC from "../models/biometricModel.js";
import Validator from "validatorjs";
import reply from '../common/reply.js';


export default {

    //Biometric create
    async createBiometric(req, res) {
        try {
            let request = req.body;
            let exist = await BIOMETRIC.findOne({ "user_id": request.user_id });
            if (exist) {
                return res.status(403).send({ message: 'This user biometric is already exist.' });
            }
            let biometric = await BIOMETRIC.create(request);
            return res.status(201).send({biometric: biometric, message: "Biometric created successfully." });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Get Biometrics List
    async getBiometricList(req, res) {
        try {
            const biometrics = await BIOMETRIC.find();
            return res.status(200).json(biometrics);
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    },


    // Delete Biometric
    async deleteBiometric(req, res) {
        try {
            let id = req.body.id;
            const biometric = await BIOMETRIC.findByIdAndRemove(id);
            if (!biometric) {
                return res.status(404).send({ message: "Biometric not found." })
            }
            return res.status(200).send({ id: id, message: "Biometric deleted successfully." })
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }


}