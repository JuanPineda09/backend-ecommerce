const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "variables.env"});

exports.autenticarUsuario = async(req, res) => {
    const {password, email} = req.body;
    try{
        //Revisar que el correo este registrado
        let usuario = await User.findOne({ email });

        if(!usuario){
            return res.status(400).json({msg:"El usuario no existe"});
        }
        
        //Validar el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passwordCorrecto){
            return res.status(404).json({msg:"password incorrecto"});
        }

        // Si todo es correcto: crear y firmar un token

        let payload = {
            usuario: {id : usuario.id},
        };
        // mostrar en postman el id res.json(payload);
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn : '30d', //30 dias
            },
            (error, token) =>{
                if(error) throw error;
                // mensaje de confirmacion
                res.json({token});
            }
            );


        console.log("Ya puedes ingresar");

    }catch(error){
        console.log(error);
    }
}

exports.usuarioAutenticado = async ( req, res) => {
    try{
        const usuario = await User.findOne(req.params.idUsuario);
        res.json({ usuario });
    }catch(error){
        res.status(403).json({msg: "Hubo un error"+error});
    }
}