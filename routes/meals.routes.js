const mealsController = require('../controllers/meals.controller');
const authMiddlewares = require('../middlewares/auth.middlewares')
const mealMiddlewares = require('../middlewares/meals.middlewares')
const validMiddlewares = require('../middlewares/validations.middlewares')
const express = require('express');

const router = express.Router();

router.get('/', mealsController.findAllMeals)
router.get('/:id',mealMiddlewares.validExistMeals,mealsController.findOneMeals)

router.use(authMiddlewares.protect)

router.post('/',validMiddlewares.createMealsValidation,authMiddlewares.restrictTo('admin'),mealsController.createMeals)

router
.route('/:id')
.patch(mealMiddlewares.validExistMeals,authMiddlewares.restrictTo('admin'),mealsController.updateMeals)
.delete(mealMiddlewares.validExistMeals,authMiddlewares.restrictTo('admin'),mealsController.deleteMeals)


module.exports = router

