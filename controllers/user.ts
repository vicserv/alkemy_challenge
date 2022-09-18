import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcryptjs';

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json({
        users
    });
}

export const createUser = async (req: Request, res: Response) => {
    const { password, image, state, role, ...data } = req.body;
    try {

        const sendgridmsg = {
            to: data.email,
            from: 'luisjimenezp46@gmail.com',
            subject: 'Welcome to the app',
            text: 'Welcome to the app',
            html: `<strong>Welcome to the app ${data.name}</strong>`,
        }

        const salt = bcrypt.genSaltSync(10);
        const user = await User.create({
            ...data,
            password: bcrypt.hashSync(password, salt),
        });

        sgMail.send(sendgridmsg);

        res.json(user);

    } catch (error) {
        res.status(500).json({
            msg: 'Error creating user' + error
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, image, state, ...data } = req.body;
    try {
        const user = await User.findByPk(id);

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(password, salt);
        }

        user!.set(data);
        await user!.save();

        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating user' + error
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        User.update({ state: false }, { where: { id } });
        res.json({
            message: 'User deleted'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting user' + error
        });
    }
}