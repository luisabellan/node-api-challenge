 const port = 4000
const express = require("express");
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");

const server = express();
server.use(express.json());

server.get("/api/", (req, res) => res.send("API up and running!"));

// POST -done
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

// todo
server.post("/api/projects/:id/actions", (req, res) => {
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

//GET done
server.get("/api/projects", (req, res) => {
  projects
    .get()

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

// GET /api/projects/:id done
server.get("/api/projects/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      // console.log(post);
      if (project === null) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

      return res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});


server.delete("/api/projects/:id", (req, res) => {

  projects.get(req.params.id).then((project) => {
    if (project === null) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }
    
  });

  projects.remove(req.params.id)
    .then((project) => {
        res.status(204).json()

    })
    .catch((error) => {
        res.status(500).json({
            error: "The project could not be removed"
        })

    })

})

server.listen(port, () => console.log(`API running on port ${port}`));
