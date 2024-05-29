const express = require("express");
const app = express();
const fs = require('node:fs');

const path = require("path")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))




app.get("/" , function(req, res){
    fs.readdir("./files", function(err , files){
        res.render("index.ejs", {data : files})
    
    })
    
    
})
app.get("/file/:filename" , function(req, res){
   fs.readFile(`./files/${req.params.filename}`,"utf-8" ,function(err,filedata){
    res.render("show.ejs",{filename : req.params.filename, filedata :filedata})
   })
    
    
})
app.get("/edit/:filename" ,  function(req, res){
    res.render('edit.ejs',{filename : req.params.filename})
})

app.post("/create" , function(req, res){
    fs.writeFile(`./files/ ${req.body.title.split(" ").join("")}.txt` , req.body.details , function(err){
res.redirect("/edit/:filename")
    } )
    
    
})
app.post("/edit" , function(req, res){
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}`,function(err){
        res.redirect('/')
    })
    
    
})
app.listen(port, function(req ,res){
    console.log("it's running " );
});