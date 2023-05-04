require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModels = require('./models/init.models');

const port = +process.env.PORT || 3013;
db.authenticate()
  .then(() => console.log('authenticate database'))
  .catch((err) => console.log(err));

initModels();

db.sync()
  .then(() => console.log(' database sync'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
