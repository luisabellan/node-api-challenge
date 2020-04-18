"use strict";

<<<<<<< HEAD
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
=======
/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
var express = require("express");

var cors = require("cors");

var router = express.Router(); //const projectRouter = require('./data/helpers/projects/projectRouter')
//const welcomeRouter = require('./data/helpers/welcome/welcomeRouter')

var projects = require("./data/helpers/projectModel");

var server = express();
server.use(express.json());
server.use(cors()); //welcome

server.get("/api/", function (req, res) {
  projects.get(req.params.id).then(function (projects) {
    res.status(200).json(projects);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});
server.get("/api/:id", function (req, res) {
  projects.get(req.params.id).then(function (projects) {
>>>>>>> 8fa1143e92d45bf429e1a979c60b456628683fd2
    res.status(200).json(projects);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
<<<<<<< HEAD
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
=======
      error: "The posts information could not be retrieved."
    });
  });
}); // server.use('/api/', welcomeRouter)
// server.use('/api/projects', projectRouter)

server.listen(4000, function () {
  return console.log("API running on port 4000");
>>>>>>> 8fa1143e92d45bf429e1a979c60b456628683fd2
});