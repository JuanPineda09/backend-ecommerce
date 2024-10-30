const express = require("express");
const productosControllers = require('../controllers/productosController');


const router = express.Router();

router.get("/productos", productosControllers.getProductos);

router.get("/productos/:idProducto", productosControllers.getIdProductos);

router.post("/productos", productosControllers.postProductos);

router.delete("/productos/:idProducto", productosControllers.deleteIdProductos);

router.put("/productos/:idProducto", productosControllers.putIdProductos);

module.exports = router;