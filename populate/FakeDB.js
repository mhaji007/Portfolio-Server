
const { portfolios, blogs } = require('./data');
const Portfolios = require('../db/models/portfolio');
const Blog = require('../db/models/blog');
class FakeDB {
    async clean() {
        await Portfolios.deleteMany({});
        await Blog.deleteMany({});
    }

    async addData() {
        await Portfolios.create(portfolios);
        await Blog.create(blogs);

    }

    async populate() {
        await this.clean();
        await this.addData();

    }
}

module.exports = new FakeDB();