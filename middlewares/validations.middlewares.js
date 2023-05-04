const { body, validationResult } = require('express-validator');

const valiFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('email cannot be empty'),
  body('email').notEmpty().withMessage('email cannot be empty'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),
  valiFields,
];

exports.userValidation = [
  body('email').notEmpty().withMessage('email cannot be empty'),
  body('password').notEmpty().withMessage('password cannot be empty'),
  valiFields,
];

exports.createMealsValidation = [
  body('price').notEmpty().withMessage('price cannot be empty'),
  body('name').notEmpty().withMessage('name cannot be empty'),
  valiFields,
];


exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  valiFields,
];

