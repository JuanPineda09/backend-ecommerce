const Categorias = require("../models/categorias");
const multer = require('multer');
const fs = require('node:fs')
const { validationResult } = require('express-validator');

exports.getCategorias = async ( req, res ) => {
    const categoria1 = await Categorias.findAll();
    res.json(categoria1);
}

exports.getIdCategorias = async ( req, res ) => {
    try{
        const idCategoria = req.params.idCategoria;

        if (!idCategoria) {
            return res.status(400).json({ message: 'El parámetro idCategoria es necesario.' });
        }

        const categoria1 = await Categorias.findOne({ where: { idCategoria: idCategoria } });

        if (!categoria1) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        
        res.json(categoria1);
    }catch(error){
        console.log(error);}
}

exports.postCategorias = async ( req, res ) => {
    const {nombre, descripcion} = req.body;

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
        }
        if (!req.file) {
            return  await res.status(400).json({ error: 'No se ha subido ningún archivo' }); 
        }

        const newPath =  await saveImage(req.file);
        const categoriaNew = new Categorias({
            nombre,
            descripcion,
            imagen: newPath,
        });


        await categoriaNew.save();
        res.json(categoriaNew);

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error al crear la categoría" });
    }
};

async function saveImage(file) {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedFileTypes.includes(file.mimetype)) {
        throw new Error('Tipo de archivo no permitido');
    }

    const newPath = path.join(__dirname, '../uploads', sanitize(file.originalname));
    await fs.promises.rename(file.path, newPath);
    return newPath;
}

exports.putIdCategorias = async ( req, res ) => {
    const {idCategoria} = req.params;

    const categoria1 = await Categorias.findByPk(idCategoria);

    if(!categoria1){
        return res.status(400).json({msg: "Categoria no encontrada"});
    }

    const imagenReq = req.body.descripcion;
    const imagenBase64 = decodeBase64(imagenReq);
    console.log(imagenBase64)

    categoria1.nombre = req.body.nombre  || categoria1.nombre;
    categoria1.descripcion = req.body.descripcion  || categoria1.descripcion;
    categoria1.imagen = imagenBase64 || categoria1.imagen;
    
    categoria1.save();
    res.json({ categoria1 });
}

exports.deleteIdCategorias = async ( req, res ) => {
    try{
        const idCategoria = req.params.idCategoria;
        const categoria1 = await Categorias.destroy({ where: { idCategoria: idCategoria } });

        if (categoria1 === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
          }

        res.json({msg: "Categoria eliminada"});
    }catch(error){
        console.log(error);}
}