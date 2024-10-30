const bcryptjs = require('bcryptjs');
const User = require('../models/user');


exports.getUsers = async ( req, res ) => {
    const usuario = await User.findAll();
    res.json(usuario);
}

exports.getIdUsers = async ( req, res ) => {
    try{
        const idUser = req.params.idUsuario;

        if (!idUser) {
            return res.status(400).json({ message: 'El id del usuario es necesario.' });
        }

        const usuario1 = await User.findOne({ where: { idUsuario: idUser } });

        if (!usuario1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json(usuario1);
    }catch(error){
        console.log(error);}
}

exports.postUsers = async (req, res) => {

    const {password, idUsuario} = req.body;

    try{
        //revisar que sea un unico correo y que no se vea el error en el codigo
        let usuario = await User.findByPk(idUsuario);

        if(usuario){
            return res.status(400).json({msg:"El usuario ya existe"});
        }

        //Crear un nuevo usuario
        usuario = new User(req.body);

        //Hash Encriptar
        usuario.password = await bcryptjs.hash(password,10);

        //Guardar usuario en la DB
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

    }catch(error){
        console.log(error);
    }
};

exports.putIdUsers = async ( req, res ) => {
    const {idUsuario} = req.params;

    const usuario = await User.findByPk(idUsuario);

    if(!usuario){
        return res.status(400).json({msg: "Usuario no encontrada"});
    }


    usuario.nombre = req.body.nombre  || usuario.nombre;
    usuario.email = req.body.email  || usuario.email;
    usuario.password = req.body.password || usuario.password;
    usuario.roleId = req.body.roleId || usuario.roleId;

    usuario.save();
    res.json({ usuario });
}

exports.deleteIdUsers = async ( req, res ) => {
    try{
        const idUser = req.params.idUsuario;
        const usuario = await User.destroy({ where: { idUsuario: idUser } });

        if (usuario === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }

        res.json({msg: "Usuario eliminado"});
    }catch(error){
        console.log(error);}
}
