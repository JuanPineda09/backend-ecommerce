const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './variables.env' });

module.exports= function ( req, res, next ){
    //Leer el token desde header de postman
    const token = req.header("x-auth-token");
    //console.log(token); 

    // Revisar si existe un token o no
    if(!token){
        return res.status(400).json({msg:"No hay un Token"});
    }

    // Validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA)
        console.log(cifrado)
        req.usuario= cifrado.usuario;
        //console.log(cifrado.usuario);
        next();
    }catch(error){
        res.status(400).json({msg:"Token no valido"});
    }
}