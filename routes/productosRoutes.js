const express = require("express");
const productosControllers = require('../controllers/productosController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get("/productos", productosControllers.getProductos);

router.get("/productos/:idProducto", authMiddleware, productosControllers.getIdProductos);

router.post("/productos", authMiddleware, productosControllers.postProductos);

router.delete("/productos/:idProducto", authMiddleware, productosControllers.deleteIdProductos);

router.put("/productos/:idProducto", authMiddleware, productosControllers.putIdProductos);

module.exports = router;