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

exports.createBlog = async (req, res) => {
    const blogData = req.body;
    blogData.userId = req.user.sub;
    const blog = new Blog(blogData);
  
    try {
      const createdBlog = await blog.save();
      return res.json(createdBlog);
    } catch(e) {
      return res.status(422).send(err.message);
    }
  }


  exports.updateBlog = async (req, res) => {
    const { body, params: {id}} = req;
    
    // const blog = await Blog.findById(id);
    // Below is an alternative to the above await syntax

    Blog.findById(id, async (err, blog) => {
      if (err) {
        return res.status(422).send(err.message);
      }
  
      // TODO: Check if user is publishing blog
      // and if user is publishing then create SLUG
  
      blog.set(body);
      blog.updateAt = new Date();
  
      try {
        const updatedBlog = await blog.save();
        return res.json(updatedBlog);
      } catch(err) {
        return res.status(422).send(err.message);
      }
    });
  }