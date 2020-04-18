
const express = require('express');
const actions = require('../data/helpers/actionModel.js');
const router = express.Router();

// GET /:id - done
router.get("/:id", (req, res) => {
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

// DELETE /:id 
router.delete("/:id", (req, res) => {

  projects.get(req.params.id).then((project) => {
    if (!action) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist.",
      });
    }
    
  });

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

// Update - PUT /:id
router.put("/:id", (req, res) => {

    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        return res.status(400).json({
          errorMessage: "Please provide project_id and description for the post.",
        });
    }

    actions.update(req.body,req.params.id)
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
  
    actions.update(req.body.project_id,req.body)
      .then((action) => {
        
              console.log(res)

             return res.status(200).json(action)
        

  
      })
      .catch((error) => {
          console.log(error)
         return res.status(500).json({
            error: "The project information could not be modified."
          })
  
      })
  
  
})
