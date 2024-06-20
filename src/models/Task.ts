import mongoose, { Document, Schema, Types } from "mongoose";

// Definición de los posibles estados de la tarea
const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
}

// Tipo para los estados de la tarea
export type taskStatus = typeof taskStatus[keyof typeof taskStatus]

// Interfaz para el modelo de tarea
export interface ITask extends Document {
    name: string,
    description: string,
    project: Types.ObjectId, // Tipo ObjectId de Mongoose para la referencia al proyecto
    status: taskStatus
}

// Definición del esquema de la tarea
export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true // Corregido de 'requires' a 'required'
    },
    description: {
        type: String,
        trim: true,
        required: true // Corregido de 'requires' a 'required'
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project' // Referencia al modelo de proyecto
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // Solo valores permitidos son los definidos en 'taskStatus'
        default: taskStatus.PENDING // Estado por defecto
    }
}, { timestamps: true }); // Opciones adicionales: marca de tiempo para la creación y actualización

// Definición del modelo de tarea utilizando el esquema definido
const Task = mongoose.model<ITask>('Task', TaskSchema);

// Exportamos el modelo de tarea
export default Task;
