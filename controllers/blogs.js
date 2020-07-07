const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const { getAccessToken, getAuth0User } = require('./auth');

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

exports.getBlogsByUser = async (req, res) => {
    const userId = req.user.sub;
    try {
        const blogs = await Blog
            .find({userId,
            status:{$in: ['draft', 'published']}
            });
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
        // return res.json(blog);
        // getAccessToken((error, data) => {
        // return res.json(blog);
        //   });
        const { access_token } = await getAccessToken();
        const user = await getAuth0User(access_token)(blog.userId);
      
        return res.json({blog, user});

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
  const _saveBlog = async blog => {
    try {
      const createdBlog = await blog.save();
      return createdBlog;
    } catch(e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        blog.slug += `-${uniqueSlug()}`;
        return _saveBlog(blog);
      }
  
      throw(e);
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
  
      // Check if user is publishing blog
      // and if user is publishing then create SLUG

      if (body.status && body.status === 'published' && !blog.slug) {
        blog.slug = slugify(blog.title, {
          replacement: '-',
          lower: true
        });
      }
  
      blog.set(body);
      blog.updateAt = new Date();
  
      try {
        const updatedBlog = await _saveBlog(blog);

        return res.json(updatedBlog);
      } catch(err) {
        return res.status(422).send(err.message);
      }
    });
  }