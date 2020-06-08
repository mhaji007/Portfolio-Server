const {portfolios} = require('./data');
const Portfolios = require('../db/models/portfolio');

class FakeDB {
    async clean() {
        await Portfolios.deleteMany({});
    }

    async addData() {
        await Portfolios.create(portfolios);

    }

    async populate() {
        await this.clean();
        await this.addData();

    }
}

module.exports = new FakeDB();