const config = require('../config/dev');
const mongoose = require('mongoose');
const fakeDB = require('./FakeDB')


  return mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }, async (err) => {
    if (err) { console.error(err); }
    else {
    console.log('> Initiating database population...');
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log('> Database population completed.');
    }
  })