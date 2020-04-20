
const express = require('express');
const actions = require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel.js');
const router = express.Router();

// CREATE - POST /:id/actions
router.post("/:id/actions", (req, res) => {
 


  if (!req.body.project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project for the action.",
    });
  }
 /* const projectAction = projects.getProjectActions(req.body.post_id);

   if (projectAction.length === 0) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } */
try {
     actions
    .insert(req.body)

    .then((action) => {
      return res.status(201).json(action);
    })
    .catch((error) => {
      //console.log(error);
      res.status(404).json({
        message: "The project with the specified ID does not exist.",
      });
    });
} catch (error) {
    console.log(error)
    
    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
    
}
 
});


// GET /:id/actions/ - DONE
router.get("/:id/actions", (req, res) => {

req.id = req.params.id
  projects
    .getProjectActions(req.params.id)

    .then((action) => {
      // console.log(post);
      if (action === null) {
        res.status(404).json({
          message: "This project has no actions.",
        });
      }

      return res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The action information could not be retrieved.",
      });
    });
});

// GET /:id/actions/:id2 - DONE
router.get("/:id/actions/:id2", (req, res) => {

  req.id = req.params.id

  actions
    .get(req.params.id2)

    .then((action) => {
      // console.log(post);
      if (action === null) {
        res.status(404).json({
          message: "This project has no actions.",
        });
      }

      return res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "The action information could not be retrieved.",
      });
    });
});

// DELETE /:id TEST
router.delete("/:id/actions/:id2", (req, res) => {
   
  req.id = req.params.id
  actions.remove(req.params.id2)
  .then((action) => {
    if (!action) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist.",
      });
    }



    projects.remove(req.params.id)
      .then((project) => {
        res.status(204).json()

      })
      .catch((error) => {
        res.status(500).json({
          error: "The action could not be removed"
        })

      })

  })

  // Update - PUT /:id TODO
  router.put("/:id/actions", (req, res) => {

    if (!req.body.notes || !req.body.description || !req.body.project_id) {
      return res.status(400).json({
        errorMessage: "Please provide project_id and description for the project.",
      });
    }

    actions.update(req.body, req.params.id)
      .then((action) => {
        if (action === null) {
          return res.status(404).json({
            message: "The action with the project ID does not exist.",
          });

        }





      })
      .catch((error) => {
        console.log(error)

      })



  })
})

module.exports = router;
