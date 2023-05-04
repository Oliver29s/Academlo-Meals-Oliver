const Restaurants = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistRestau = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  const restaurants = await Restaurants.findOne({
    where: {
      id: restaurantId || id,
      status: true,
    },
  });

  if (!restaurants) {
    return next(new AppError(`Restaurant with id: ${id} not found`, 401));
  }

  req.restaurants = restaurants;
  next();
});
