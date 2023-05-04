const {Sequelize} = require('sequelize')

const db = new Sequelize({
    dialect: process.env.BD_DIALECT,
    host:process.env.localhost,
    username:process.env.DB_USERNAME,
    database:process.env.BD_DATABASE,
    password:process.env.DB_PASWWORD,
   
    logging: false
})

module.exports = {db}