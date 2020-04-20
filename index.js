const port = 4000
const express = require("express");
const cors = require("cors");

const router = express.Router()

const projectRouter = require('./projects/projectRouter')
const actionRouter = require('./actions/actionRouter')
const welcomeRoute = require('./welcome/welcomeRoute')

const projects = require("./data/helpers/projectModel");

const server = express();
server.use(express.json());
server.use(cors())

server.use('/api/', welcomeRoute)
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)











server.listen(port, () => console.log(`API running on port ${port}`));
