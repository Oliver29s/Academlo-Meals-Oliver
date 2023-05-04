const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.model');

exports.validExistOrders = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orders = await Orders.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!orders) {
    return next(new AppError(`Orders with id: ${id} not found`, 401));
  }

  req.orders = orders;
  next();
});
