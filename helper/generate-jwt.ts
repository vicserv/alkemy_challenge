import jwt from 'jsonwebtoken';

export const generateJwt = (id: number) => {
    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            {
                expiresIn: '12h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Could not generate token');
                } else {
                    resolve(token);
                }
            }
        );
    });
}