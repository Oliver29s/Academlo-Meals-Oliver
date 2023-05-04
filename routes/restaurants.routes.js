const restaurantsController = require('../controllers/restaurants.controller');
const restaurantsMiddlewares = require('../middlewares/restaurant.middlewares')
const authMiddlewares = require('../middlewares/auth.middlewares')
const express = require('express');

const router = express.Router();

router.get('/', restaurantsController.findAllRes)
router.get('/:id',restaurantsMiddlewares.validExistRestau,restaurantsController.findOneUsers)

router.use(authMiddlewares.protect)

router.post('/',restaurantsController.createRes)

router
.route('/:id')
.patch(restaurantsMiddlewares.validExistRestau,restaurantsController.updateRestaurant)
.delete(restaurantsMiddlewares.validExistRestau,restaurantsController.deleteRestaurant)

module.exports = router