const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/reviews.model');
const AppError = require('../utils/appError');
const User = require('../models/user.model');

exports.existReviews = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Reviews.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review) {
    return next(AppError('reviews not found'));
  }

  res.status(200).json({
    status: 'success',
    review,
  });
  req.user = review.user
  req.review = review;
  next();
});
