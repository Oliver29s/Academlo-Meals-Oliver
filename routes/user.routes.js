const userController = require('../controllers/user.controller');

const validMiddlewares = require('../middlewares/validations.middlewares')
const userMiddlewares = require('../middlewares/user.middlewares')

const authMiddlewares = require('../middlewares/auth.middlewares')


const express = require('express');

const router = express.Router();

router.use(authMiddlewares.protect)

router.get('/',userController.readlAllUser)

router.get('/order', userController.readAllOrders)

router.get('/order/:id', userController.readOneOrders)



router
.route('/:id')
.patch(userMiddlewares.validExistUser,authMiddlewares.protectAccountOwner,validMiddlewares.userValidation,userController.updateUsers)
.delete(userMiddlewares.validExistUser,authMiddlewares.protectAccountOwner,userController.deleteUsers)

module.exports = router


