import { Request, Response } from "express"
import User from "../models/user";
import bcrypt from 'bcryptjs';
import { generateJwt } from "../helper/generate-jwt";

export const loginAuth = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        // Email exists
        const user = await User.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password', 'role'] });

        if (!user) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - email'
            });
        }

        console.log(user.state)
        if (user.state == false) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - state: false'
            });
        }

        // Password verification
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - password'
            });
        }

        // Generate JWT
        const token = await generateJwt(user.id);

        res.json({
            user,
            token
        });



    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong' + error
        })
    }
}