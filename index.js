 const port = 4000
const express = require("express");
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");

const server = express();
server.use(express.json());

server.get("/api/", (req, res) => res.send("API up and running!"));

// CREATE -  POST /api/projects -
server.post("/api/projects", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the post.",
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
        error: "There was an error while saving the post to the database",
      });
    });
});

// UPDATE - POST /api/projects/:id/actions
server.post("/api/projects/:id/actions", (req, res) => {
 


  if (!req.body.project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project for the action.",
    });
  }
  const projectAction = projects.getProjectActions(req.body.post_id);

  if (projectAction.length === 0) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  }
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

//GET /api/projects 
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

// GET /api/projects/:id 
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

// DELETE /api/projects/:id done
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

// Update - PUT /api/projects/:id
server.put("/api/projects/:id", (req, res) => {

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
          errorMessage: "Please provide name and description for the post.",
        });
    }

    projects.get(req.params.id)
    .then((project) => {
      if (project === null) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
        }
   
    })
    .catch((error) => {
        console.log(error)

    })
  
    projects.update(req.params.id,req.body)
      .then((project) => {
        
              console.log(res)

             return res.status(200).json(project)
        

  
      })
      .catch((error) => {
          console.log(error)
         return res.status(500).json({
            error: "The project information could not be modified."
          })
  
      })
  
  
})


// ACTIONS




// GET /api/projects/:id 
server.get("/api/actions/:id", (req, res) => {
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

// DELETE /api/projects/:id 
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

// Update - PUT /api/projects/:id
server.put("/api/projects/:id", (req, res) => {

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
          errorMessage: "Please provide name and description for the post.",
        });
    }

    projects.get(req.params.id)
    .then((project) => {
      if (project === null) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
        }
   
    })
    .catch((error) => {
        console.log(error)

    })
  
    projects.update(req.params.id,req.body)
      .then((project) => {
        
              console.log(res)

             return res.status(200).json(project)
        

  
      })
      .catch((error) => {
          console.log(error)
         return res.status(500).json({
            error: "The project information could not be modified."
          })
  
      })
  
  
})



server.listen(port, () => console.log(`API running on port ${port}`));
