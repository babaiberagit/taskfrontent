const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const DbConnection = require("./Config/DbConnection.js");
const cors = require('cors');
const bodyParser = require("body-parser");

// Routes Import
const UserRoutes = require("./Routes/userRoutes.js");
const BlogRoutes = require("./Routes/blogRoutes.js");

const app = express();
DbConnection();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/user", UserRoutes);
app.use("/api/blog", BlogRoutes);

// Server listen
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running successfully on port ${process.env.PORT}`);
});
