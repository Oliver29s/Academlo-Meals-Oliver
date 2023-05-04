const Orders = require('../models/orders.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.readlAllUser = catchAsync(async (req, res) => {
  const user = await User.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Orders
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The query has bee n done successfully',
    user,
  });
});

exports.readAllOrders = catchAsync(async (req, res) => {
  const user = await Orders.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The query has bee n done successfully',
    user,
  });
});

exports.readOneOrders = catchAsync(async (req, res) => {
  const { sessionUser } = req;

  const user = await Orders.findOne({
    where: {
      id: sessionUser.id,
      status: true,
    },
    attributes: ['id', 'name', 'role'],
    include: [
      {
        model: User,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The query has bee n done successfully',
    user,
  });
});

exports.updateUsers = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'update user exit',
  });
});

exports.deleteUsers = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'succes',
    message: 'The user has ben deleted',
  });
});

exports.findOneUsers = catchAsync(async (req, res) => {
  const user = req.user

  res.status(200).json({
    status: 'succes',
    user,
  });
});
