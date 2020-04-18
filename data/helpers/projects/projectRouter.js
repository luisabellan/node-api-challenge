const express = require('express');
const projects = require('../projectModel');
const router = express.Router();


router.projects("", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the project.",
    });
  }

  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the project to the database",
      });
    });
});

router.project("/:id/comments", (req, res) => {
  console.log(req.params.id);
  const projectId = req.params.id;
  req.body.project_id = projectId;

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }
  const projectComment = projects.findPostComments(req.body.project_id);

  if (projectComment.length === 0) {
    return res.status(404).json({
      message: "The project with the specified ID does not exist.",
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
          message: "The project with the specified ID does not exist.",
        });
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});

router.get("", (req, res) => {
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

router.get("/:id", (req, res) => {
  projects
    .findById(req.params.id)
    .then((project) => {
      // console.log(project);
      if (project.length === 0) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }

      return res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The project information could not be retrieved.",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  projects
    .findCommentById(req.params.id)
    .then((project) => {
      // console.log(project);
      if (project.length === 0) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }

      return res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

router.delete("/:id", (req, res) => {
  projects.findById(req.params.id).then((project) => {
    if (project.length === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist.",
      });
    }
  });

  projects
    .remove(req.params.id)
    .then((project) => {
      res.status(204).json();
    })
    .catch((error) => {
      res.status(500).json({
        error: "The project could not be removed",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the project.",
    });
  }

  projects
    .findById(req.params.id)
    .then((project) => {
      if (project.length === 0) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  projects
    .update(req.params.id, req.body)
    .then((project) => {
      console.log(res);

      return res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The project information could not be modified.",
      });
    });
});

module.exports = router;
