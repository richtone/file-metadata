"use strict";

var express = require("express");
var multer = require("multer");
var fs = require("fs");

var upload = multer({ dest: 'uploads/' });
var port = process.env.PORT;

express()
.use(express.static(__dirname+"/html"))
.get("/", (req,res) => {
    res.sendFile("index.html");
})
.post("/get-file-size", upload.single('fileWithSize'), (req,res) => {
      console.dir(req.file);
      
      if (req.file) {
          
          fs.unlink(req.file.path, () => {
              res.end(JSON.stringify({size:req.file.size}));
          })
          
      } else {
          res.end("No file uploaded");
      }
})
.listen(port || 8080);