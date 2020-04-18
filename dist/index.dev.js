"use strict";

var port = 4000;

var express = require("express");

var projects = require("./data/helpers/projectModel");

var actions = require("./data/helpers/actionModel");

var server = express();
server.use(express.json());
server.get("/api/", function (req, res) {
  return res.send("API up and running!");
});
server.post("/api/projects", function (req, res) {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }

  projects.insert(req.body).then(function (project) {
    res.status(201).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  });
});
server.post("/api/projects/:id/comments", function (req, res) {
  console.log(req.params.id);
  var postId = req.params.id;
  req.body.post_id = postId;

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }

  var postComment = projects.findPostComments(req.body.post_id);

  if (postComment.length === 0) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  }

  try {
    projects.insertComment(req.body).then(function (comment) {
      return res.status(201).json(comment);
    })["catch"](function (error) {
      //console.log(error);
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});
server.get("/api/projects", function (req, res) {
  projects.find().then(function (projects) {
    res.status(200).json(projects);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The projects information could not be retrieved."
    });
  });
});
server.get("/api/projects/:id", function (req, res) {
  projects.findById(req.params.id).then(function (post) {
    // console.log(post);
    if (post.length === 0) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }

    return res.status(200).json(post);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
});
server.listen(port, function () {
  return console.log("API running on port ".concat(port));
});