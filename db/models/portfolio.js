const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const portfolioSchema = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Portfolio', portfolioSchema);
