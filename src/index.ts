// Importamos el servidor desde el archivo 'server'
import server from './server'
// Importamos la librería 'colors' para darle estilo a los mensajes en la consola
import colors from 'colors'

// Definimos el puerto en el cual el servidor escuchará
// Si la variable de entorno PORT está definida, la usamos; de lo contrario, usamos el puerto 4000
const port = process.env.PORT || 4000

// Ponemos el servidor a escuchar en el puerto especificado
server.listen(port, () => {
    // Cuando el servidor esté en funcionamiento, imprimimos un mensaje en la consola
    // El mensaje tendrá un fondo magenta y será en negrita gracias a la librería 'colors'
    console.log(colors.bgMagenta.bold(`Rest Api funcionando en el puerto: ${port}`))
})



