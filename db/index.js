const config = require('../config/dev');
const mongoose = require('mongoose');

// Inform Mongoose of the model created
require('./models/portfolio');

exports.connect = () => {
  return mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }, (err) => {
    if (err) { console.error(err); }
    else {
      console.log('Connected to DB!');
    }
  })
}