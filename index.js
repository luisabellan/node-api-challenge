/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require("express");
const cors = require("cors");

const router = express.Router()
//const projectRouter = require('./data/helpers/projects/projectRouter')
//const welcomeRouter = require('./data/helpers/welcome/welcomeRouter')
const projects = require("./data/helpers/projectModel");

const server = express();
server.use(express.json());
server.use(cors())

//welcome

server.get("/api/", (req, res) => {
    projects
      .get(req.params.id)
  
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: "The posts information could not be retrieved.",
        });
      });
  });
  server.get("/api/:id", (req, res) => {
    projects
      .get(req.params.id)
  
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: "The posts information could not be retrieved.",
        });
      });
  });


// server.use('/api/', welcomeRouter)
// server.use('/api/projects', projectRouter)


server.listen(4000, () => console.log("API running on port 4000"));

