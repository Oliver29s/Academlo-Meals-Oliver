const catchAsync = require('../utils/catchAsync');
const Restaurants = require('../models/restaurants.model');
const User = require('../models/user.model');

exports.createRes = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const number = Math.ceil(Math.random() * 5);
  const restaurants = await Restaurants.create({
    name,
    address,
    rating: number,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user has ben created succesfully',
    restaurants,
  });
});

exports.findAllRes = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: {
      status: true,
    },
    
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has bee done successfully',
    restaurants,
  });
});

exports.findOneUsers = catchAsync(async (req, res) => {
  const restaurants = req.restaurants;

  res.status(200).json({
    status: 'succes',
    restaurants,
  });
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { restaurants } = req;
  const { name, address } = req.body;

  await restaurants.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'update restaurant exit',
    restaurants,
  });
}); 

exports.deleteRestaurant = catchAsync(async (req, res) => {
    const { restaurants } = req;

  await restaurants.update({ status: false });

  res.status(200).json({
    status: 'succes',
    message: 'The restaurant has ben deleted',
  });
});
