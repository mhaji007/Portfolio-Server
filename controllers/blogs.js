const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog
            .find({status: 'published'})
            .sort({createdAt: -1});
        return res.json(blogs);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        return res.json(blog);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }
}

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({slug: req.params.slug})
        return res.json(blog);
    } catch (error) {
        return res
            .status(422)
            .send(error.message);
    }
}