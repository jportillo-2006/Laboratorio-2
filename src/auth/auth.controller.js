import Usuario from '../users/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT} from '../helpers/generate-jwt.js';

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await Usuario.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, correo no existe en la base de datos'
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(user.id);

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso!!',
            userDetails: {
                token: token,
            }
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: 'Server error',
            error: e.message
        });
    }
};

export const studentRegister = async (req, res) => {

    try {

        const data = req.body;

        const encryptedPassword = await hash (data.password);

        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: encryptedPassword,
            role: "STUDENT_ROLE"
        })

        return res.status(201).json({
            message: 'User registered successfully',
            userDetails: {
                user: user.email
            }
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: 'User registration failed',
            error
        })

    }
}

export const teacherRegister = async (req, res) => {

    try {

        const data = req.body;

        const encryptedPassword = await hash (data.password);

        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: encryptedPassword,
            role: "TEACHER_ROLE"
        })

        return res.status(201).json({
            message: 'User registered successfully',
            userDetails: {
                user: user.email
            }
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: 'User registration failed',
            error
        })
    }
}