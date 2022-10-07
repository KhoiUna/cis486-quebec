require("dotenv").config();
const { response } = require("express");
const express = require("express");
const PostUtil = require("./utils/PostUtil");
const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const posts = await PostUtil.getPosts();

  res.render("index", {
    posts,
  });
});

app.get("/post", async (req, res) => {
  res.render("post");
});

app.post("/post", async (req, res) => {
  try {
    const response = await PostUtil.savePost(req.body);

    if (!response) throw new Error();

    res.redirect("/");
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

app.post("/delete/:postId", async (req, res) => {
  try {
    const response = await PostUtil.deletePost(req.params.postId);

    if (!response) throw new Error();

    return res.redirect("/");
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

app.post("/update/:postId", async (req, res) => {
  try {
    const response = await PostUtil.updatePost(req.params.postId, req.body);

    if (!response) throw new Error();

    return res.redirect("/");
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}/`)
);
