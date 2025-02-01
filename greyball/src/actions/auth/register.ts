'use server';

import bcryptjs from 'bcryptjs'

export const registerUser = async (name: string, email: string, password: string) => {
    const Users = require('../../schemas/users')
    try {

        const user = await Users.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return {
            ok: true,
            user: user,
            message: 'Usuario creado'
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }



}