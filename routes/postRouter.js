const router = require("express").Router();
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const auth = require("../middleware/auth");
const e = require("express");

router.get("/:id", async (req, res) => {
  let response = {};
  try {
    let post = await Post.findById(req.params.id);
    response.success = true;
    response.body = post;
    res.json(response);
  } catch (error) {
    response.message = error;
    res.json(response);
  }
});

router.get("/", async (req, res) => {
  let response = {};
  try {
    let post = await Post.find({});
    response.success = true;
    response.body = post;
    res.json(response);
  } catch (error) {
    response.message = error;
    res.json(response);
  }
});

router.post("/new", auth, async (req, res) => {
  let response = {};
  try {
    if (req.body.title && req.body) {
      let post = new Post(req.body);
      console.log(post);
      await post.save();

      response.body = post;
      response.success = true;
      res.json(response);
    } else {
      response.message = `Could not submit post`;
      res.json(response);
    }
  } catch (error) {
    response.message = `Could not submit post, check error: ${error}`;
    res.json(response);
    console.log(response.message);
  }
});

router.post("/:id/comments", auth, async (req, res) => {
  let response = {};
  console.log(req.body);
  try {
    if (req.body.text) {
      let comment = new Comment(req.body);
      await comment.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });

      response.message = "Successfully posted a comment";
      response.success = true;
      response.comment = comment;

      res.json(response);
    } else {
      response.message = "Could not post comment";
      res.json(response);
    }
  } catch (error) {
    response.message = `Could not post comment. Error: ${error}`;
    res.json(response);
  }
});

router.get("/:id/comments", async (req, res) => {
  let response = {};

  try {
    let comments = await Comment.find({ post: req.params.id });
    response.success = true;
    response.comments = comments;
    res.json(response);
  } catch (error) {
    response.message = { error };
    res.json(response);
  }
});

module.exports = router;
