"use strict";

var express = require('express');

var actions = require('../data/helpers/actionModel.js');

var router = express.Router(); // GET /:id - done

router.get("/:id", function (req, res) {
  actions.get(req.params.id).then(function (action) {
    // console.log(post);
    if (action === null) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }

    return res.status(200).json(project);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
}); // DELETE /:id 

router["delete"]("/:id", function (req, res) {
  projects.get(req.params.id).then(function (project) {
    if (!action) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  });
  projects.remove(req.params.id).then(function (project) {
    res.status(204).json();
  })["catch"](function (error) {
    res.status(500).json({
      error: "The action could not be removed"
    });
  });
}); // Update - PUT /:id

router.put("/:id", function (req, res) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project_id and description for the post."
    });
  }

  actions.update(req.body, req.params.id).then(function (action) {
    if (action === null) {
      return res.status(404).json({
        message: "The action with the project ID does not exist."
      });
    }
  })["catch"](function (error) {
    console.log(error);
  });
  actions.update(req.body.project_id, req.body).then(function (action) {
    console.log(res);
    return res.status(200).json(action);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The project information could not be modified."
    });
  });
});
module.exports = router;