const express = require("express");

const router = express.Router();

// add myControllers
const myControllers = require("../controllers/controllers.js");

console.dir(myControllers);

module.exports = (app) => {
  router.get("/", (req, res) => {
    myControllers.index(app, req, res);
  });

  router.get("/main", (req, res) => {
    myControllers.main(app, req, res);
  });

  router.get("/allfilms", (req, res) => {
    myControllers.viewAll(app, req, res);
  });

  router.get("/api/allfilms", (req, res) => {
    myControllers.viewAllJSON(app, req, res);
  });

  router.get("/film/:filmID", (req, res) => {
    //myControllers.viewItem(app, req, res);
    myControllers.getItem(app, req, res, "oneFilm", "View: " )
  });

  router.get("/login", (req, res) => {
    return res.render("login");
  });

  router.post("/login", (req, res) => {
    myControllers.login(app, req, res);
  });

  router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  router.get("/signup", (req, res) => {
    return res.render("signup");
  });

  router.post("/signup", (req, res) => {
    myControllers.signup(app, req, res);
  });

  // add POST, PUT AND DELETE ROUTES
  router.get("/cms/", (req, res) => {
    myControllers.cms(app, req, res);
  });
  
  router.get("/cms/edit/:filmID", (req, res) => {
    //myControllers.amend(app, req, res);
     myControllers.getItem(app, req, res, "edit", "Edit Film: " )
  });
  
  router.post("/cms/edit", (req, res) => {
    myControllers.amendItem(app, req, res);
  });
  
  router.get("/cms/insert", (req, res) => {
    myControllers.insert(app, req, res);
  });
  
  router.post("/cms/insert", (req, res) => {
    myControllers.insertItem(app, req, res);
  });
  
  router.get("/cms/delete/:filmID", (req, res) => {
//     myControllers.delete(app, req, res);
       myControllers.getItem(app, req, res, "delete", "Delete Film: " )
  });
  
  router.post("/cms/delete", (req, res) => {
    myControllers.deleteItem(app, req, res);
  });
  

  return router;
};
