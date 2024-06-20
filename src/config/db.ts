// Importamos mongoose para la conexión con MongoDB
import mongoose from "mongoose";
// Importamos la librería 'colors' para dar estilo a los mensajes en la consola
import colors from 'colors'

// Función para conectar a la base de datos
export const conectDB = async () => {
    try {
        // Intentamos conectar a la base de datos usando la URL proporcionada en las variables de entorno
        const conection = await mongoose.connect(process.env.DATABASE_URL)
        // Formateamos la URL de conexión para mostrarla en la consola
        const url = `${conection.connection.host} : ${conection.connection.port}`
        // Imprimimos un mensaje de éxito en la consola, con estilo cyan y en negrita
        console.log(colors.cyan.bold(`MongoDB conectado ${url}`))
    } catch (error) {
        // En caso de error, imprimimos un mensaje de error en la consola, con estilo rojo y en negrita
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        // Finalizamos el proceso con un código de salida 1 (indica un error)
        process.exit(1)
    }
}
