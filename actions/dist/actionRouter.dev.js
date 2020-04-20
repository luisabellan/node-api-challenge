"use strict";

var express = require('express');

var actions = require('../data/helpers/actionModel.js');

var projects = require('../data/helpers/projectModel.js');

var router = express.Router(); // CREATE - POST /:id/actions

router.post("/:id/actions", function (req, res) {
  if (!req.body.project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project for the action."
    });
  }
  /* const projectAction = projects.getProjectActions(req.body.post_id);
      if (projectAction.length === 0) {
     return res.status(404).json({
       message: "The post with the specified ID does not exist.",
     });
   } */


  try {
    actions.insert(req.body).then(function (action) {
      return res.status(201).json(action);
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
}); // GET /:id/actions/ - DONE

router.get("/:id/actions", function (req, res) {
  req.id = req.params.id;
  projects.getProjectActions(req.params.id).then(function (action) {
    // console.log(post);
    if (actions === null) {
      res.status(404).json({
        message: "This project has no actions."
      });
    }

    return res.status(200).json(action);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The action information could not be retrieved."
    });
  });
}); // GET /:id/actions/:id2 - DONE

router.get("/:id/actions/:id2", function (req, res) {
  req.id = req.params.id;
  actions.get(req.params.id2).then(function (action) {
    // console.log(post);
    if (action === null) {
      res.status(404).json({
        message: "This project has no actions."
      });
    }

    return res.status(200).json(action);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The action information could not be retrieved."
    });
  });
}); // DELETE /:id TEST

router["delete"]("/:id/actions/:id2", function (req, res) {
  req.id = req.params.id;
  actions.remove(req.params.id2).then(function (action) {
    if (!action) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }

    projects.remove(req.params.id2).then(function (project) {
      res.status(204).json();
    })["catch"](function (error) {
      res.status(500).json({
        error: "The action could not be removed"
      });
    });
  }); // Update - PUT /:id TODO

  router.put("/:id/actions/:id2", function (req, res) {
    /*   req.project_id = req.params.id
      req.project_id */
    // HERE TODO
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
      return res.status(400).json({
        errorMessage: "Please provide project_id and description for the project."
      });
    }

    actions.update(req.params.id2, req.body).then(function (action) {
      if (action === null) {
        return res.status(404).json({
          message: "The action with the project ID does not exist."
        });
      }

      return res.status(201).json({
        message: "The action has been updated successfully"
      });
    })["catch"](function (error) {
      console.log(error);
    });
  });
}); // UPDATE /api/projects/:id/actions/:id2

router.put("/:id/actions/:id2", function (req, res) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({
      errorMessage: "Please provide project_id, description and notes for the project."
    });
  }

  actions.get(req.params.id).then(function (action) {
    if (action.length === 0) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  })["catch"](function (error) {
    console.log(error);
  });
  actions.update(req.params.id2, req.body).then(function (action) {
    if (action == null) {
      console.log("Action has been updated successfully.");
    } // El fallo está aquí, encontrarlo!


    return res.status(200).json(action);
  })["catch"](function (error) {
    console.log(error);
    return res.status(500).json({
      error: "The action information could not be modified."
    });
  });
});
module.exports = router;