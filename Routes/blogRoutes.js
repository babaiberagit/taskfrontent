const express = require('express');
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} = require("../Controller/blogController");
const { userAuth } = require('../middleware/authorizedUser');

router.post("/create", userAuth, createBlog);
router.get("/all", getAllBlogs);
router.get("/user/all", userAuth, getUserBlogs);
router.get("/:id", getBlogById);
router.patch("/update/:id", userAuth, updateBlog);
router.delete("/delete/:id", userAuth, deleteBlog);

module.exports = router;
