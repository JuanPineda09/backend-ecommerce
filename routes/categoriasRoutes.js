const express = require("express");
const categoriaControllers = require('../controllers/categoriaController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get("/categorias", categoriaControllers.getCategorias);

router.get("/categorias/:idCategoria", authMiddleware, categoriaControllers.getIdCategorias);

router.post("/categorias", upload.single('imagen'), categoriaControllers.postCategorias);

router.delete("/categorias/:idCategoria", authMiddleware, categoriaControllers.deleteIdCategorias);

router.put("/categorias/:idCategoria", authMiddleware, categoriaControllers.putIdCategorias);

module.exports = router;