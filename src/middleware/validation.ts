import type { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

// Middleware para manejar errores de validación de entrada
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Obtenemos los resultados de la validación de la solicitud
    let errors = validationResult(req);
    // Si hay errores de validación, enviamos una respuesta con el estado 400 y los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    // Si no hay errores, llamamos a la siguiente función middleware
    next();
}
