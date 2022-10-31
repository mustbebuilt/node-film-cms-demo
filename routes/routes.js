const express = require("express");

const router = express.Router();

const { body, validationResult } = require('express-validator');

// add myControllers
const myControllers = require("../controllers/controllers.js");

console.dir(myControllers);

module.exports = () => {
  router.get("/", (req, res) => {
    myControllers.index(req, res);
  });

  router.get("/main", (req, res) => {
    myControllers.main(req, res);
  });

  router.get("/allfilms", (req, res) => {
    myControllers.viewAll(req, res);
  });

  router.get("/api/allfilms", (req, res) => {
    myControllers.viewAllJSON(req, res);
  });

  router.get("/film/:filmID", (req, res) => {
    //myControllers.viewItem(req, res);
    myControllers.getItem(req, res, "oneFilm", "View: " )
  });
  
  router.get("/search", (req, res) => {
    //myControllers.viewItem(req, res);
    myControllers.searchResults(req, res);
  });

  router.get("/login", (req, res) => {
     return res.render('login', {
           title: "Login",
           login: req.session.login
     });
  });
  // example user server side validation via "express-validator"
  router.post("/login",   
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(400).json({ errors: errors.array() });
      let erArray = errors.array();
      let erMsg = `${erArray[0].param} error - ${erArray[0].msg}` 
      //return res.redirect("/login")
      return res.render("login", {
                  title: "Login",
                  loginMsg: erMsg,
                  login: req.session.login,
                });
    }
    myControllers.login(req, res);
  });

  router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  router.get("/signup", (req, res) => {
     return res.render('signup', {
           title: "Register",
           login: req.session.login
     });
  });

  router.post("/signup", (req, res) => {
    myControllers.signup(req, res);
  });

  // add POST, PUT AND DELETE ROUTES
  router.get("/cms/", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
    myControllers.cms(req, res);
    }
  });
  
  router.get("/cms/edit/:filmID", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
     myControllers.getItem(req, res, "edit", "Edit Film: " )
    }
  });
  
  router.post("/cms/edit", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
    myControllers.amendItem(req, res);
    }
  });
  
  router.get("/cms/insert", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
    myControllers.insert(req, res);
    }
  });
  
  router.post("/cms/insert", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
    myControllers.insertItem(req, res);
    }
  });
  
  router.get("/cms/delete/:filmID", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
       myControllers.getItem(req, res, "delete", "Delete Film: " )
    }
  });
  
  router.post("/cms/delete", (req, res) => {
    if(!req.session.login){
      return res.redirect("/login");
    }else{
    myControllers.deleteItem(req, res);
    }
  });
  

  return router;
};
