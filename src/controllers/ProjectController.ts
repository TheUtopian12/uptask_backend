import type { Request, Response } from "express";
import Project from "../models/Project";

// Clase que contiene los controladores para gestionar los proyectos
export class ProjectController {

    // Controlador para crear un proyecto
    static createProject = async (req: Request, res: Response) => {
        // Creamos una nueva instancia del modelo Project con los datos del cuerpo de la solicitud
        const project = new Project(req.body);
        try {
            // Guardamos el proyecto en la base de datos
            await project.save();
            // Enviamos una respuesta indicando que el proyecto fue creado
            res.send('Proyecto creado');
        } catch (error) {
            // Imprimimos el error en la consola en caso de fallo
            console.log(error);
        }
    }

    // Controlador para obtener todos los proyectos
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            // Buscamos todos los proyectos en la base de datos
            const projects = await Project.find({});
            // Enviamos los proyectos encontrados en la respuesta
            res.send(projects);
        } catch (error) {
            // En caso de error, podemos manejarlo adecuadamente (aquí solo se imprimiría el error en la consola)
            console.log(error);
        }
    }

    // Controlador para obtener un proyecto por su ID
    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params; // Extraemos el ID de los parámetros de la solicitud
        try {
            // Buscamos el proyecto por su ID y populamos sus tareas
            const project = await Project.findById(id).populate('tasks');
            // Si no se encuentra el proyecto, enviamos una respuesta de error
            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            // Enviamos el proyecto encontrado en la respuesta
            res.send(project);
        } catch (error) {
            // Imprimimos el error en la consola en caso de fallo
            console.log(error);
        }
    }

    // Controlador para actualizar un proyecto por su ID
    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params; // Extraemos el ID de los parámetros de la solicitud
        try {
            // Actualizamos el proyecto con los nuevos datos del cuerpo de la solicitud
            const project = await Project.findByIdAndUpdate(id, req.body);
            // Si no se encuentra el proyecto, enviamos una respuesta de error
            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            // Guardamos los cambios del proyecto
            await project.save();
            // Enviamos una respuesta indicando que el proyecto fue actualizado
            res.send('Proyecto Actualizado');
        } catch (error) {
            // Imprimimos el error en la consola en caso de fallo
            console.log(error);
        }
    }

    // Controlador para eliminar un proyecto por su ID
    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params; // Extraemos el ID de los parámetros de la solicitud
        try {
            // Buscamos el proyecto por su ID
            const project = await Project.findById(id);
            // Si no se encuentra el proyecto, enviamos una respuesta de error
            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            // Eliminamos el proyecto
            await project.deleteOne();
            // Enviamos una respuesta indicando que el proyecto fue eliminado
            res.send('Proyecto Eliminado');
        } catch (error) {
            // Imprimimos el error en la consola en caso de fallo
            console.log(error);
        }
    }
}
