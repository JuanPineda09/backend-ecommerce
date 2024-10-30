const express = require("express");
const usersControllers = require('../controllers/usersControllers');


const router = express.Router();

router.get("/users", usersControllers.getUsers);

router.get("/users/:idUsuario", usersControllers.getIdUsers);

router.post("/users", usersControllers.postUsers);

router.delete("/users/:idUsuario", usersControllers.deleteIdUsers);

router.put("/users/:idUsuario", usersControllers.putIdUsers);

module.exports = router;