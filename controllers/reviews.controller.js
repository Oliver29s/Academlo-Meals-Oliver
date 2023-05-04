const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/reviews.model');

exports.createReviews = catchAsync(async (req, res, next) => {
  const { comment } = req.body;

   const { id } = req.params;

  const uid = req.sessionUser.id;

   await Reviews.create({
    userId: uid,
    comment,
    rating: Math.ceil(Math.random() * 5),
    restaurantId: +id,
  });

  res.status(201).json({
    status: 'succes',
    reviews,
  });
});

exports.updateReviews = catchAsync(async (req, res, next) => {
  const { reviews } = req;

  const { comment } = req.body;

  await reviews.update({
    comment,
    rating: Math.ceil(Math.random() * 5),
  });

  res.status(200).json({
    status: 'success',
    message: 'Reviews update exit',
    reviews,
  });
});

exports.deleteReviews = catchAsync(async (req, res, next) => {
  const { reviews } = req;

  await reviews.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Reviews delete exit',
  });
});
