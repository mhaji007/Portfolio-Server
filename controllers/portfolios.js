const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');


// exports.getPortfolios = (req, res) => {
//     return res.json({data: [1,22,3]});
// }

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
}