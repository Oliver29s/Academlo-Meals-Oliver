const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meals.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: Restaurants,
      },
    ],
  });

  if (!user) {
    return next(new AppError(`Meals with id: ${id} not found`, 401));
  }

  req.meal = meal;
  next();
});
