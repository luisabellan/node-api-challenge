const express = require('express');
const projects = require('../data/helpers/projectModel.js');
const router = express.Router();



// CREATE -  POST  -
router.post("", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the project.",
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


//GET  
router.get("/", (req, res) => {
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

// GET /:id 
router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      // console.log(project);
      if (project === null) {
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

// DELETE //:id done
router.delete("/:id", (req, res) => {

  projects.get(req.params.id).then((project) => {
    if (project === null) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist.",
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

// Update - PUT //:id
router.put("/:id", (req, res) => {

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
          errorMessage: "Please provide name and description for the post.",
        });
    }

    projects.get(req.params.id)
    .then((project) => {
      if (project === null) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
        }
   
    })
    .catch((error) => {
        console.log(error)

    })
  
    projects.update(req.params.id,req.body)
      .then((project) => {
        
             // console.log(res)

             return res.status(200).json(project)
        

  
      })
      .catch((error) => {
          console.log(error)
         return res.status(500).json({
            error: "The project information could not be modified."
          })
  
      })
  
  
})

module.exports = router;
