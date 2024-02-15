// VIEW CONTROLLER

// Import the necessary modules
const { db } = require('../db/connection');
const ObjectId = require("mongodb").ObjectId; 
const filmCollection = db.collection('filmsCollection');
const appUsers = db.collection('appUsers');
// for encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  index: function (req, res) {
    console.dir(req.session);
    return res.render("index", {
      title: "Welcome",
      message: "Demo Node Site.",
      login: req.session.login,
    });
  },

  main: function (req, res) {
    return res.render("main", {
      title: "EJS Example from Parts",
      message: "Hello Template built in parts",
      showMsg: true,
      headingOne: "Page made from parts",
    });
  },
  // async as waiting for connection details
  viewAll: async function (req, res) {
    const films = await filmCollection.find().toArray();
        return res.render("films", {
          title: "All Films",
          films: films,
          login: req.session.login,
        });
  },

  viewAllJSON: async function (req, res) {
    console.info("View All JSON controller");
     const films = await filmCollection.find().toArray();
    return res.json(films);
  },

  getItem: async function (req, res, view, viewTitle) {
    console.info("Get Item controller");
     let filmID = req.params.filmID;
    let o_id = new ObjectId(filmID);
    const film  = await filmCollection.find({ _id: o_id }).toArray();
    return res.render(view, {
          title: `${viewTitle} ${film[0].filmTitle}`,
          film: film[0],
          login: req.session.login,
        }); 
  },

  searchResults: async function (req, res) {
    console.info("View All controller");
    var searchVal = req.query.searchVal;
    console.info(searchVal);

const films = await filmCollection.find({ filmTitle: { $regex: new RegExp(searchVal, "i") } }).toArray();

   
        return res.render("films", {
          title: "Search Results for " + searchVal,
          searchMsg: `Your Search Found ${films.length} films.`,
          films: films,
          login: req.session.login,
        });

  },

  login: async function (req, res) {
    console.info("Login controller");
    console.dir(req.body);
    let username = req.body.username;
    let password = req.body.password;
    console.info(username);
    const docs = await appUsers.find({ name: username }).toArray();
    console.dir(docs);
    if (docs.length > 0) {
          ///////
          bcrypt.compare(
            req.body.password,
            docs[0].password,
            function (err, result) {
              console.info(result);
              if (result == true) {
                req.session.login = true;
                res.redirect("/");
              } else {
                return res.render("login", {
                  title: "Login",
                  loginMsg: "Sorry Invalid Password",
                  login: req.session.login,
                });
              }
            }
          );
        } else {
          return res.render("login", {
            title: "Login",
            loginMsg: "Sorry Invalid User",
            login: req.session.login,
          });
        }
  },

  signup: async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  // Check if username or password is empty
  if (!username || !password) {
    return res.render("signup", {
      title: "Register",
      registerMsg: "Username and password are required",
      login: req.session.login,
    });
  }

  try {
    // Check if username already exists
    const existingUser = await appUsers.findOne({ name: username });
    if (existingUser) {
      return res.render("signup", {
        title: "Register",
        registerMsg: "Sorry, username already exists",
        login: req.session.login,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object
    const newUser = { name: username, password: hashedPassword };

    // Insert the new user into the appUsers collection
    const result = await appUsers.insertOne(newUser);
    if (result.insertedCount === 1) {
      // User successfully inserted
      return res.redirect("/login");
    } else {
      // User insertion failed
      return res.redirect("/login");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).send("Internal Server Error");
  }
}
,


  cms: async function (req, res) {
    console.info("CMS List controller");
      const films = await filmCollection.find().toArray();
    
        return res.render("cms", {
          title: "All Films",
          films: films,
          login: req.session.login,
        });
    
  },

  insert: function (req, res) {
    return res.render("insert", {
      title: "Add Film",
      login: req.session.login,
    });
  },

insertItem: async function (req, res) {
    console.info("Insert Form Post controller");
    var newFilm = req.body;
    try {
        const result = await filmCollection.insertOne(newFilm);
        console.log(result);
        if (result.acknowledged === true) {
            console.log("Film added successfully.");
            return res.redirect('/cms'); // Redirect to /cms if data is added successfully
        } else {
            console.error("Failed to add film.");
            return res.redirect('/cms/error');
            // return res.status(500).send("Failed to add film."); 
            // Return an error response if data insertion failed
        }
    } catch (error) {
        console.error("Error adding film:", error);
        return res.redirect('/cms/error');
        // return res.status(500).send("Error adding film.");
         // Return an error response if an exception occurred during insertion
    }
},

amendItem: async function (req, res) {
  console.info("Amend POST controller");
  var amendFilm = req.body;
  let filmID = amendFilm.id;
  var o_id = new ObjectId(filmID);

  try {
    const result = await filmCollection.updateOne(
      { _id: o_id },
      {
        $set: {
          filmTitle: amendFilm.filmTitle,
          filmCertificate: amendFilm.filmCertificate,
          filmDescription: amendFilm.filmDescription,
          filmImage: amendFilm.filmImage,
          filmPrice: amendFilm.filmPrice,
          filmReview: amendFilm.filmReview,
          releaseDate: amendFilm.releaseDate,
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.redirect("/cms");
    } else {
      res.redirect("/cms/error");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/cms/error");
  }
},

deleteItem: async function (req, res) {
  console.info("Delete Form controller");
  var formData = req.body;
  let filmID = formData.filmID;
  var o_id = new ObjectId(filmID);

  try {
    const result = await filmCollection.deleteOne({ _id: o_id });

    if (result.deletedCount === 1) {
      res.redirect("/cms");
    } else {
      res.redirect("/cms/error");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/cms/error");
  }
}

};
