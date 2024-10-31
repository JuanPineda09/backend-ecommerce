const Productos = require('../models/productos');


exports.getProductos = async ( req, res ) => {
    const productos = await Productos.findAll();
    res.json(productos);
}

exports.getIdProductos = async ( req, res ) => {
    try{
        const idProducto = req.params.idProducto;

        if (!idProducto) {
            return res.status(400).json({ message: 'El id del producto es necesario.' });
        }

        const producto1 = await Productos.findOne({ where: { idProducto: idProducto } });

        if (!producto1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json(producto1);
    }catch(error){
        console.log(error);}
}

exports.postProductos = async (req, res) => {

    const {nombre} = req.body;

    try{
        //revisar que sea un unico producto y que no se vea el error en el codigo

        const producto = await Productos.findOne({ where: { nombre: nombre } });
        if(producto){
            return res.status(400).json({msg:"El producto ya existe"});
        }

        //Crear un nuevo producto
        const producto1 = new Productos(req.body);

        //Guardar producto en la DB
        const productoAlmacenado = await producto1.save();
        res.json(productoAlmacenado);

    }catch(error){
        console.log(error);
    }
};

exports.putIdProductos = async ( req, res ) => {
    const {idProducto} = req.params;

    const producto = await Productos.findByPk(idProducto);

    if(!producto){
        return res.status(400).json({msg: "Producto no encontrada"});
    }


    producto.nombre = req.body.nombre  || producto.nombre;
    producto.descripcion = req.body.descripcion  || producto.descripcion;
    producto.imagen = req.body.imagen || producto.imagen;
    producto.stock = req.body.stock || producto.stock;
    producto.estado = req.body.estado || producto.estado;
    producto.precio = req.body.precio || producto.precio;
    producto.categoriaId = req.body.categoriaId || producto.categoriaId;

    producto.save();
    res.json({ producto });
}

exports.deleteIdProductos = async ( req, res ) => {
    try{
        const idProducto = req.params.idProducto;
        const producto = await Productos.destroy({ where: { idProducto: idProducto } });

        if (producto === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
          }

        res.json({msg: "Producto eliminado"});
    }catch(error){
        console.log(error);}
}