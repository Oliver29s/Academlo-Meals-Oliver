const catchAsync = require('../utils/catchAsync');
const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meal = await Meals.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Restaurants,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has bee done successfully',
    meal,
  });
});

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const meal = await Meals.create({ name, price });

  res.status(201).json({
    status: 'success',
    message: 'Meals create exit',
    meal,
  });
});

exports.findOneMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(201).json({
    status: 'success',
    meal,
  })
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'The meal has ben update succesfully',
    meal,
  });
});

exports.deleteMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'false' });

  res.status(200).json({
    status: 'success',
    message: 'The meal has ben delete succesfully',
    meal,
  });
});
