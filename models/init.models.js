const Meals = require("./meals.model");
const Orders = require("./orders.model");
const Restaurants = require("./restaurants.model");
const Reviews = require("./reviews.model");
const User = require("./user.model");


const initModels = () =>{
    User.hasMany(Reviews)
    Reviews.belongsTo(User)

    User.hasMany(Orders)
    Orders.belongsTo(User)

    Restaurants.hasMany(Meals)
    Meals.belongsTo(Restaurants)

    Restaurants.hasMany(Reviews)
    Reviews.belongsTo(Restaurants)

    Meals.hasOne(Orders)
    Orders.belongsTo(Meals)


}

module.exports = initModels

