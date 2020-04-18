 const port = 4000
const express = require("express");
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");

const server = express();
server.use(express.json());

server.get("/api/", (req, res) => res.send("API up and running!"));

server.post("/api/projects", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the post.",
    });
  }

  projects
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

server.post("/api/projects/:id/comments", (req, res) => {
  console.log(req.params.id);
  const postId = req.params.id;
  req.body.post_id = postId;

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }
  const postComment = projects.findPostComments(req.body.post_id);

  if (postComment.length === 0) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  }
try {
     projects
    .insertComment(req.body)

    .then((comment) => {
      return res.status(201).json(comment);
    })
    .catch((error) => {
      //console.log(error);
      res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    });
} catch (error) {
    console.log(error)
    
    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
    
}
 
});

server.get("/api/projects", (req, res) => {
  projects
    .find()

    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The projects information could not be retrieved.",
      });
    });
});

server.get("/api/projects/:id", (req, res) => {
  projects
    .findById(req.params.id)
    .then((post) => {
      // console.log(post);
      if (post.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

      return res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

server.listen(port, () => console.log(`API running on port ${port}`));
