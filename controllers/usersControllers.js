const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function crearUsuario(req, res) {
    const { nombre, email, password, roleId } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!nombre || !email || !password || !roleId) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear el nuevo usuario
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            roleId
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error al crear usuario' });
    }
}

module.exports = {
    crearUsuario,
};
