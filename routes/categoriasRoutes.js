const express = require("express");
const categoriaControllers = require('../controllers/categoriaController');


const router = express.Router();

router.get("/categorias", categoriaControllers.getCategorias);

router.get("/categorias/:idCategoria", categoriaControllers.getIdCategorias);

router.post("/categorias", categoriaControllers.postCategorias);

router.delete("/categorias/:idCategoria", categoriaControllers.deleteIdCategorias);

router.put("/categorias/:idCategoria", categoriaControllers.putIdCategorias);

module.exports = router;