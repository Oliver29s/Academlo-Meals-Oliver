const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const restaurantsRoutes = require('./routes/restaurants.routes')
const mealsRoutes = require ('./routes/meals.routes')
const ordersRoutes = require('./routes/orders.routes')

const AppError = require('./utils/appError');
const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();
app.use(cors())

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users',authRouter );
app.use('/api/v1/users', userRouter);

app.use('/api/v1/restaurants', restaurantsRoutes);
app.use('/api/v1/meals', mealsRoutes);
// app.use('/api/v1/orders', ordersRoutes);


app.all('*',(req,res,next)=>{
    return next(new AppError(`cant not find ${req.originalUrl} on this`, 404))
})

app.use(globalErrorHandler)

module.exports = app;