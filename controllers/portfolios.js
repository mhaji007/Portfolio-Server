// Endpoint responsible for communicating with the database

const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');


// exports.getPortfolios = (req, res) => {
//     return res.json({data: [1,22,3]});
// }

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
}

exports.getPortfolioById = async (req, res) => {
    try {
    const portfolio = await Portfolio.findById(req.params.id);
    return res.json(portfolio);
    } catch(error) {
        return res.status(422).send(error.message);
    }
}


exports.createPortfolio = async (req, res) => {
    const portfolioData = req.body;
    //TODO: Extract from req
    const userId = 'auth0|5ed95170a36eb2001976617a';
    // Make an instance of the Portfolio model using portfolio data
    const portfolio = new Portfolio(portfolioData);
    
    portfolio.userId = userId;
    
    try {
        const newPortfolio = await portfolio.save();
        return res.json(newPortfolio);
    } catch(error) {
        return res.status(422).send(error.message);
    }
  
}