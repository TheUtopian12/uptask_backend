import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

// Extendemos la interfaz Request de Express para incluir el campo 'project' de tipo IProject
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

// Middleware para validar si un proyecto existe
export async function validateProjectExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params; // Extraemos el ID del proyecto de los parámetros de la solicitud

        // Buscamos el proyecto por su ID
        const project = await Project.findById(projectId);

        // Si el proyecto no se encuentra, enviamos una respuesta de error
        if (!project) {
            const error = new Error('Proyecto no encontrado');
            return res.status(404).json({ error: error.message });
        }

        // Asignamos el proyecto encontrado al objeto de la solicitud
        req.project = project;
        // Llamamos a la siguiente función middleware
        next();
    } catch (error) {
        // En caso de error, imprimimos el error en la consola
        console.log(error);
    }
}
