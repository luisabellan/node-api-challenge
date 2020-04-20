"use strict";var port=4e3,express=require("express"),cors=require("cors"),router=express.Router(),projectRouter=require("./projects/projectRouter"),actionRouter=require("./actions/actionRouter"),welcomeRoute=require("./welcome/welcomeRoute"),projects=require("./data/helpers/projectModel"),server=express();server.use(express.json()),server.use(cors()),server.use("/api/",welcomeRoute),server.use("/api/projects",projectRouter),server.use("/api/actions",actionRouter),server.listen(port,function(){return console.log("API running on port ".concat(port))});