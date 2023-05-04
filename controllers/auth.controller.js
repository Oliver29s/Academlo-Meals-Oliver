const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrytp = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.singup = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrytp.genSalt(11);
  const encryptPass = await bcrytp.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptPass,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has ben created succesfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      status: true,
      email:email.toLowerCase()

    },
  });

  if (!user) {
    return next( new AppError('The user could not be found',404));
  }

  await bcrytp.compare(password,user.password)

  if(!(await bcrytp.compare(password,user.password))){
    return next(new AppError('user or password incorrect',401))
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    status: 'success',
    token,
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
    }
  });
});

