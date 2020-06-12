// Endpoint responsible for handling request from the browser
// Forwards requests to controllers/portfolios.js

const express = require('express');
const router = express.Router();
const {getPortfolios, getPortfolioById, createPortfolio} = require('../controllers/portfolios');

router.get('', getPortfolios);
router.get('/:id', getPortfolioById);

router.post('', createPortfolio)

module.exports = router;