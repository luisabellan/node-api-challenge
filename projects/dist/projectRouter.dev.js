"use strict";

var express = require('express');

var projects = require('../projectModel');

var router = express.Router();
router.projects("", function (req, res) {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the project."
    });
  }

  projects.insert(req.body).then(function (project) {
    res.status(201).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "There was an error while saving the project to the database"
    });
  });
});
router.project("/:id/comments", function (req, res) {
  console.log(req.params.id);
  var projectId = req.params.id;
  req.body.project_id = projectId;

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }

  var projectComment = projects.findPostComments(req.body.project_id);

  if (projectComment.length === 0) {
    return res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  }

  try {
    projects.insertComment(req.body).then(function (comment) {
      return res.status(201).json(comment);
    })["catch"](function (error) {
      //console.log(error);
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});
router.get("", function (req, res) {
  projects.find().then(function (projects) {
    res.status(200).json(projects);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The projects information could not be retrieved."
    });
  });
});
router.get("/:id", function (req, res) {
  projects.findById(req.params.id).then(function (project) {
    // console.log(project);
    if (project.length === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }

    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The project information could not be retrieved."
    });
  });
});
router.get("/:id/comments", function (req, res) {
  projects.findCommentById(req.params.id).then(function (project) {
    // console.log(project);
    if (project.length === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }

    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The comments information could not be retrieved."
    });
  });
});
router["delete"]("/:id", function (req, res) {
  projects.findById(req.params.id).then(function (project) {
    if (project.length === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  });
  projects.remove(req.params.id).then(function (project) {
    res.status(204).json();
  })["catch"](function (error) {
    res.status(500).json({
      error: "The project could not be removed"
    });
  });
});
router.put("/:id", function (req, res) {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the project."
    });
  }

  projects.findById(req.params.id).then(function (project) {
    if (project.length === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  })["catch"](function (error) {
    console.log(error);
  });
  projects.update(req.params.id, req.body).then(function (project) {
    console.log(res);
    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The project information could not be modified."
    });
  });
});
module.exports = router;