import User from '../users/user.model.js';
import Course from '../courses/course.model.js'
import { response } from 'express';

export const newCourse = async (req, res) => {

    try {
        
        const { name, description } = req.body;

        const course = new Course({
            name,
            description
        });

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Curso creado exitosamente',
            course
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el curso',
            error: error.message
        })
    }
}

export const getCourses = async (req, res) => {
    
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {

        const courses = await Course.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        if (!courses.length) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            })
        }

        const total = await Course.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            courses
        })
        
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: 'Error al mostrar cursos',
            error: error.message
        })
    }
}

export const deleteCourse = async (req, res) => {

    const { id } = req.params;

    try {
        
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        await User.updateMany(
            { courses: id },
            { $pull: { courses: id } }
        );

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Curso eliminado'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar curso',
            error: error.message
        });
    }
}

export const updateCourse = async (req, res = response) => {

    try {
        
        const { id } = req.params;
        const { _id, students, ...data } = req.body;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            })
        }

        const updateCourse = await Course.findByIdAndUpdate(id, data, { new: true });

        if (students) {
            await User.updateMany(
                { course: id },
                { $pull: { courses: id } }
            );

            await User.updateMany(
                { _id: { $in: students } },
                { $addToSet: { courses: id } }
            )
        }

        res.status(200).json({
            success: true,
            message: 'Curso actualizado',
            course: updateCourse
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar curso',
            error: error.message
        })
    }
}