const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const rolesList = require('../config/rolesList');

const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getAllUsers)
    .post(verifyRoles(rolesList.admin, rolesList.editor),usersController.createUser)
    .put(verifyRoles(rolesList.admin, rolesList.editor),usersController.updateUser)
    .delete(verifyRoles(rolesList.admin),usersController.deleteUser);

router.route('/:id').get(usersController.getUser);

module.exports = router;