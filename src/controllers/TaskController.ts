import type { Request, Response } from 'express';
import Task from '../models/Task';

// Clase que contiene los controladores para gestionar las tareas
export class TaskContoller {

    // Controlador para crear una nueva tarea
    static createTask = async (req: Request, res: Response) => {
        try {
            // Creamos una nueva instancia del modelo Task con los datos del cuerpo de la solicitud
            const task = new Task(req.body);
            // Asignamos el ID del proyecto a la tarea
            task.project = req.project.id;
            // Añadimos el ID de la tarea a la lista de tareas del proyecto
            req.project.tasks.push(task.id);
            // Guardamos tanto la tarea como el proyecto de forma simultánea
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ]);
            // Enviamos una respuesta indicando que la tarea fue creada correctamente
            res.send('Tarea creada correctamente');
        } catch (error) {
            // En caso de error, podríamos manejarlo adecuadamente (aquí solo se dejaría vacío)
            console.error(error);
        }
    }

    // Controlador para obtener todas las tareas de un proyecto
    static getTasks = async (req: Request, res: Response) => {
        try {
            // Buscamos todas las tareas que pertenecen al proyecto actual y populamos el proyecto
            const tasks = await Task.find({
                project: req.project.id
            }).populate('project');
            // Enviamos las tareas encontradas en la respuesta
            res.json(tasks);
        } catch (error) {
            // En caso de error, enviamos un mensaje indicando que hubo un error
            res.send('Hubo un error');
        }
    }

    // Controlador para obtener una tarea específica por su ID
    static getTasksByID = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params; // Extraemos el ID de la tarea de los parámetros de la solicitud
            // Buscamos la tarea por su ID
            const task = await Task.findById(taskId);
            // Si la tarea no se encuentra, enviamos una respuesta de error
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            // Si la tarea no pertenece al proyecto actual, enviamos una respuesta de error
            if (task.project.toString() !== req.project.id) {
                return res.status(404).json({ error: 'Acción no válida' });
            }
            // Enviamos la tarea encontrada en la respuesta
            res.json(task);
        } catch (error) {
            // En caso de error, enviamos un mensaje indicando que hubo un error
            res.send('Hubo un error');
        }
    }


    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params; // Extraemos el ID de la tarea de los parámetros de la solicitud
            // Buscamos la tarea por su ID
            const task = await Task.findById(taskId);
            // Si la tarea no se encuentra, enviamos una respuesta de error
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            // Si la tarea no pertenece al proyecto actual, enviamos una respuesta de error
            if (task.project.toString() !== req.project.id) {
                return res.status(404).json({ error: 'Acción no válida' });
            }
            // Enviamos la tarea encontrada en la respuesta
            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.send('Tarea actualizada correctamente')
        } catch (error) {
            // En caso de error, enviamos un mensaje indicando que hubo un error
            res.send('Hubo un error');
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params; // Extraemos el ID de la tarea de los parámetros de la solicitud
            // Buscamos la tarea por su ID
            const task = await Task.findById(taskId, req.body);
            // Si la tarea no se encuentra, enviamos una respuesta de error
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            // Enviamos la tarea encontrada en la respuesta

            req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)




            await Promise.allSettled([task.deleteOne(), req.project.save()])

            res.send('Tarea eliminada correctamente')
        } catch (error) {
            // En caso de error, enviamos un mensaje indicando que hubo un error
            res.send('Hubo un error');
        }
    }




    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params

            const task = await Task.findById(taskId);
            // Si la tarea no se encuentra, enviamos una respuesta de error
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            const { status } = req.body
            task.status = status
            await task.save()
            res.send('Tarea actualizada');
        } catch (error) {
            // En caso de error, enviamos un mensaje indicando que hubo un error
            res.send('Hubo un error');
        }
    }
}
