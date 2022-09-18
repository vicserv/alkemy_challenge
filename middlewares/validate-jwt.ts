import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'There is no token in the request'
        });
    }

    try {

        const user = await jwt.verify(
            token,
            process.env.JWT_SECRET || 'secret'
        );

        req.body.user_jwt = user

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Token is not valid'
        });
    }

}