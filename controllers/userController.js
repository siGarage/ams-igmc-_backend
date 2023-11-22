import User from "../models/userModel.js";
import Validator from "validatorjs";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import reply from '../common/reply.js';
import Token from '../models/tokenModel.js';
import crypto from 'crypto';



function makeid() {
    return crypto.randomBytes(20).toString('hex');
}


export default {
    // user registration:
    async userRegister(req, res) {
        let request = req.body;
        if (Object.keys(request).length == 0) {
            return res.json(reply.failed("All input is required!"));
        }
        let validation = new Validator(request, {
            name: 'required|string',
            email: 'required|email',
            password: 'required_if:role,0|min:8',
        });
        if (validation.fails()) {
            let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
            return res.json(reply.failed(validation.errors.first(err_key)));
        }
        const exist = await User.findOne({ "email": request.email }).sort('-created_at')
        if (exist) {
            return res.json(reply.failed('This email is already exists!'));
        }
        try {
            // if (request.role != 0) {
            //     let user_email = request.email;
            //     let user_password = request.password;
            //     let hash_password = bcrypt.hashSync(user_password);
            //     if ((exist) || !exist) {
            //         request.password = hash_password
            //         let updated = await User.create(request);
            //         return res.json(reply.success("User Created Successfully!!", updated));
            //     }
            // }
            request.password = bcrypt.hashSync(request.password);
            const user = await User.create(request)
            return res.json(reply.success("User Created Successfully!!", user));
        } catch (err) {
            console.log("err", err)
            return res.json(reply.failed("Something Went Wrong!"))
        }
    },

    // user login:
    async userLogin(req, res) {
        let request = req.body;
        if (Object.keys(request).length == 0) {
            return res.json(reply.failed("All input is required!"))
        }
        let validation = new Validator(request, {
            email: 'required|email',
            password: 'required',
        });
        if (validation.fails()) {
            let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
            return res.json(reply.failed(validation.errors.first(err_key)));
        }
        try {
            const user = await User.findOne({ email: request.email.toString().toLowerCase() }).sort('-created_at');
            if (!user) {
                return res.json(reply.failed("The selected email is invalid"))
            }
            if (!user) {
                return res.json(reply.failed('User does not exist!'));
            }
            const passwordIsvalid = bcrypt.compareSync(request.password, user.password);
            if (!passwordIsvalid) {
                return res.json(reply.failed("Password Incorrect!"));
            }
            var token_id = makeid();
            let token = jwt.sign({ "user_id": user._id, "tid": token_id }, process.env.SECRET_KEY, { expiresIn: "24h" });
            await Token.create({ token_id, user_id: user._id });
            const { password, ...responseUser } = user._doc
            return res.json(reply.success("Login Successfully!!", { responseUser, token: token }))
        } catch (err) {
            return res.json(reply.failed("Something Went Wrong!"))
        }
    },


    // User Logout
    async logout(req, res) {
        try {
            let _id = req.user._id
            await Token.deleteMany({ user_id: _id })
            return res.json(reply.success("User Logged Out Successfully!!"))

        } catch (err) {
            console.log(err, "error");
            return res.json(reply.failed("Unable to logout!"))
        }
    },


}


