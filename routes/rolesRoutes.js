const express = require('express');
const rolesControllers = require('../controllers/rolesControllers');

const router = express.Router()

router.get("/roles", rolesControllers.getRoles);

router.get("/roles/:idRole", rolesControllers.getIdRoles);

router.post("/roles", rolesControllers.postRoles);

router.delete("/roles/:idRole", rolesControllers.deleteIdRoles);

router.put("/roles/:idRole", rolesControllers.putIdRoles);

module.exports = router;