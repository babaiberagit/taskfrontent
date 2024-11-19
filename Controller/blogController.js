const Blog = require("../Model/blogModel");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id: authorId, name: authorName } = req.user;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    // Create the blog entry
    const newBlog = await Blog.create({
      title,
      content,
      authorId,
      authorName,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all blog of particular user
const getUserBlogs = async (req, res) => {
  try {
      // Assuming the authenticated user's ID is stored in `req.user.id`
      const userId = req.user.id;

      const userBlogs = await Blog.find({ authorId : userId });

      if (userBlogs.length === 0) {
          return res.status(404).json({ message: 'No blogs found for this user.' });
      }

      res.status(200).json({ blogs: userBlogs });
  } catch (error) {
      console.error("Error fetching user blogs:", error);
      res.status(500).json({ message: 'Failed to fetch user blogs.' });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    
    console.log(id)
    console.log(title)
    console.log(content)
    console.log(userId)

    // Find the blog by ID and authorId
    const blog = await Blog.findOne({ _id: id, authorId: userId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or you do not have permission to update this blog.",
      });
    }

    // Update the blog details
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; 
    // Find and delete the blog by ID and authorId
    const blog = await Blog.findOneAndDelete({ _id: id, authorId: userId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or you do not have permission to delete this blog.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports ={
  createBlog,
  getAllBlogs,
  getUserBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
}