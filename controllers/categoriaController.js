const Categorias = require("../models/categorias")


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
    try{
        const categoria1 = new Categorias(req.body);
        categoria1.save();
        res.json(categoria1);
    }catch(error){
        console.log(error);
    }
}

exports.putIdCategorias = async ( req, res ) => {
    const {idCategoria} = req.params;

    const categoria1 = await Categorias.findByPk(idCategoria);

    if(!categoria1){
        return res.status(400).json({msg: "Categoria no encontrada"});
    }

    const imagenReq = req.body.descripcion;
    const imagenBase64 = imagenReq.toString('base64');
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