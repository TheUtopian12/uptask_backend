// Importamos express para crear el servidor
import express from "express";
// Importamos dotenv para gestionar variables de entorno
import dotenv from 'dotenv';
// Importamos la función para conectar a la base de datos
import { conectDB } from "./config/db";
// Importamos las rutas para los proyectos
import projectRoutes from './routes/projectRoutes';

// Cargamos las variables de entorno desde el archivo .env
dotenv.config();

// Conectamos a la base de datos
conectDB();

// Creamos una instancia de la aplicación express
const app = express();

// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(express.json());

// Definimos las rutas para los proyectos
app.use('/api/projects', projectRoutes);

// Exportamos la aplicación para que pueda ser utilizada en otros archivos
export default app;
