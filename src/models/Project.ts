import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

// Definición de la interfaz para el modelo de proyecto
export interface IProject extends Document {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[]
}

// Definición del esquema del proyecto
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId, // Se usa el tipo ObjectId de Mongoose para relacionar con las tareas
            ref: 'Task' // Referencia al modelo de tareas
        }
    ]
}, { timestamps: true }); // Opciones adicionales: marca de tiempo para la creación y actualización

// Definición del modelo de proyecto utilizando el esquema definido
const Project = mongoose.model<IProject>('Project', ProjectSchema);

// Exportamos el modelo de proyecto
export default Project;
