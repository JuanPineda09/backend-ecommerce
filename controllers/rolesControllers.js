const Roles = require("../models/roles")


exports.getRoles = async ( req, res ) => {
    const rol1 = await Roles.findAll();
    res.json(rol1);
}

exports.getIdRoles = async ( req, res ) => {
    try{
        const idRole = req.params.idRole;

        if (!idRole) {
            return res.status(400).json({ message: 'El parámetro idRole es necesario.' });
        }

        const rol1 = await Roles.findOne({ where: { idRole: idRole } });

        if (!rol1) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        
        res.json(rol1);
    }catch(error){
        console.log(error);}
}

exports.postRoles = async ( req, res ) => {
    try{
        const rol1 = new Roles(req.body);
        rol1.save();
        res.json(rol1);
    }catch(error){
        console.log(error);
    }
}

exports.putIdRoles = async ( req, res ) => {
    const {idRole} = req.params;

    const rol1 = await Roles.findByPk(idRole);

    if(!rol1){
        return res.status(400).json({msg: "Producto no encontrada"});
    }


    rol1.nombre = req.body.nombre  || rol1.nombre;
    rol1.descripcion = req.body.descripcion  || rol1.descripcion;
    
    rol1.save();
    res.json({ rol1 });
}

exports.deleteIdRoles = async ( req, res ) => {
    try{
        const idRole = req.params.idRole;
        const rol1 = await Roles.destroy({ where: { idRole: idRole } });

        if (rol1 === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
          }

        res.json({msg: "producto eliminado"});
    }catch(error){
        console.log(error);}
}