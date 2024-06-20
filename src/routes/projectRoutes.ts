// Importamos el Router de express para definir rutas
import { Router } from "express";
// Importamos funciones para la validación de datos desde 'express-validator'
import { body, param } from 'express-validator';
// Importamos los controladores para proyectos y tareas
import { ProjectController } from "../controllers/ProjectController";
import { TaskContoller } from "../controllers/TaskController";
// Importamos middleware para manejar errores de validación y validación de proyecto existente
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExist } from "../middleware/project";

// Creamos una instancia del router
const router = Router();

// Ruta para crear un proyecto
router.post('/',
    // Validamos que 'projectName' no esté vacío
    body('projectName').notEmpty().withMessage('El Nombre es obligatorio'),
    // Validamos que 'clientName' no esté vacío
    body('clientName').notEmpty().withMessage('El Cliente es obligatorio'),
    // Validamos que 'description' no esté vacío
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    // Middleware para manejar errores de validación
    handleInputErrors,
    // Controlador para crear un proyecto
    ProjectController.createProject
);

// Ruta para obtener todos los proyectos
router.get('/', ProjectController.getAllProjects);

// Ruta para obtener un proyecto por ID
router.get('/:id',
    // Validamos que 'id' sea un ID de MongoDB válido
    param('id').isMongoId().withMessage('ID no es valido'),
    // Middleware para manejar errores de validación
    handleInputErrors,
    // Controlador para obtener un proyecto por ID
    ProjectController.getProjectById
);

// Ruta para actualizar un proyecto por ID
router.put('/:id',
    // Validamos que 'id' sea un ID de MongoDB válido
    param('id').isMongoId().withMessage('ID no es valido'),
    // Validamos que 'projectName' no esté vacío
    body('projectName').notEmpty().withMessage('El Nombre es obligatorio'),
    // Validamos que 'clientName' no esté vacío
    body('clientName').notEmpty().withMessage('El Cliente es obligatorio'),
    // Validamos que 'description' no esté vacío
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    // Middleware para manejar errores de validación
    handleInputErrors,
    // Controlador para actualizar un proyecto
    ProjectController.updateProject
);

// Ruta para eliminar un proyecto por ID
router.delete('/:id',
    // Validamos que 'id' sea un ID de MongoDB válido
    param('id').isMongoId().withMessage('ID no es valido'),
    // Middleware para manejar errores de validación
    handleInputErrors,
    // Controlador para eliminar un proyecto
    ProjectController.deleteProject
);

// Rutas para tareas

// Middleware para validar si el proyecto existe
router.param('projectId', validateProjectExist);

// Ruta para crear una tarea en un proyecto específico
router.post('/:projectId/task',
    // Validamos que 'name' de la tarea no esté vacío
    body('name').notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    // Validamos que 'description' de la tarea no esté vacío
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    // Middleware para manejar errores de validación
    handleInputErrors,
    // Controlador para crear una tarea
    TaskContoller.createTask
);

// Ruta para obtener todas las tareas de un proyecto
router.get('/:projectId/task', TaskContoller.getTasks);

// Ruta para obtener una tarea específica por su ID dentro de un proyecto
router.get('/:projectId/task/:taskId',
    // Validamos que 'taskId' sea un ID de MongoDB válido
    param('taskId').isMongoId().withMessage('ID no es valido'),
    // Controlador para obtener una tarea por su ID
    TaskContoller.getTasksByID
);

router.put('/:projectId/task/:taskId',
    // Validamos que 'taskId' sea un ID de MongoDB válido
    param('taskId').isMongoId().withMessage('ID no es valido'),

    body('name').notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    // Validamos que 'description' de la tarea no esté vacío
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    handleInputErrors,

    // Controlador para obtener una tarea por su ID
    TaskContoller.updateTask
);


router.delete('/:projectId/task/:taskId',
    // Validamos que 'taskId' sea un ID de MongoDB válido
    param('taskId').isMongoId().withMessage('ID no es valido'),

    handleInputErrors,

    // Controlador para obtener una tarea por su ID
    TaskContoller.deleteTask
);

router.post('/:projectId/task/:taskId/status',
    // Validamos que 'taskId' sea un ID de MongoDB válido
    param('taskId').isMongoId().withMessage('ID no es valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),

    handleInputErrors,

    // Controlador para obtener una tarea por su ID
    TaskContoller.updateStatus
);


export default router;
