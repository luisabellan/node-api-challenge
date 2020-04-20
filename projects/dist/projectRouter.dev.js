"use strict";

var express = require('express');

var projects = require('../data/helpers/projectModel.js');

var router = express.Router(); // CREATE -  POST  -

router.post("", function (req, res) {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the post."
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
}); //GET  

router.get("/", function (req, res) {
  projects.get().then(function (projects) {
    res.status(200).json(projects);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The projects information could not be retrieved."
    });
  });
}); // GET /:id 

router.get("/:id", function (req, res) {
  projects.get(req.params.id).then(function (project) {
    // console.log(project);
    if (project === null) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }

    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
}); // DELETE //:id done

router["delete"]("/:id", function (req, res) {
  projects.get(req.params.id).then(function (project) {
    if (project === null) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist."
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
}); // Update - PUT //:id

router.put("/:id", function (req, res) {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the post."
    });
  }

  projects.get(req.params.id).then(function (project) {
    if (project === null) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  })["catch"](function (error) {
    console.log(error);
  });
  projects.update(req.params.id, req.body).then(function (project) {
    // console.log(res)
    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The project information could not be modified."
    });
  });
});
module.exports = router;