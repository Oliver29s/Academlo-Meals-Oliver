const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.model');

exports.findAll = catchAsync(async(req, res, next) => {
    return res.json(/* valor a retornar */)
});