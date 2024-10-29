const express = require("express");
const usersControllers = require('../controllers/usersControllers');


const router = express.Router();

// router.get("/users", usersControllers.getUsers);

// router.get("/users/:id", usersControllers.getIdUsers);

router.post("/users");

// router.delete("/users/:id", usersControllers.deleteIdUsers);

// router.put("/users/:id", usersControllers.putIdUsers);

module.exports = router;