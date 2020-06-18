// Endpoint responsible for communicating with the database

const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');

// exports.getPortfolios = (req, res) => {     return res.json({data:
// [1,22,3]}); }

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
}

exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        return res.json(portfolio);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }
}

exports.createPortfolio = async (req, res) => {
    const portfolioData = req.body;
    //TODO: Extract from req
    // CheckJWT will provide user on a req object in the next middleware
    const userId = req.user.sub;
    // Make an instance of the Portfolio model using portfolio data
    const portfolio = new Portfolio(portfolioData);

    portfolio.userId = userId;

    try {
        const newPortfolio = await portfolio.save();
        return res.json(newPortfolio);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }

}
exports.updatePortfolio = async (req, res) => {
    const {body, params: {
            id
        }} = req;

    try {
        const updatedPortfolio = await Portfolio.findOneAndUpdate({
            _id: id
        }, body, {
            // Make sure we will always get the updated portfolio back
            new: true,
            // Make sure validators of the MongoDB are run
            runValidators: true
        })
        return res.json(updatedPortfolio);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }
}

exports.deletePortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOneAndRemove({_id: req.params.id});
    return res.json({_id: portfolio.id})
  }