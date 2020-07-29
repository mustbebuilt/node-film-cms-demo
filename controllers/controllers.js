// VIEW CONTROLLER

var ObjectId = require('mongodb').ObjectId;

// for encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  
      index: function (app, req, res) {


            console.dir(req.session);
            return res.render("index", {
                title: "Welcome",
                message: "Demo Node Site.",
                login: req.session.login
            });

    },

    main: function (app, req, res) {

        return res.render('main', {
            title: 'EJS Example from Parts',
            message: 'Hello Template built in parts',
            showMsg: true,
            headingOne: 'Page made from parts'
        });

    },

    viewAll: function (app, req, res) {
        console.info("View All controller")
        if (!req.session.login) {
            res.redirect("/login");
        } else {
            app.set('myDb').collection('filmsCollection').find({}).toArray(function (err, docs) {
                //console.dir(docs)
                if (err) {
                    console.error(err)
                }
                return res.render('films', {
                    title: "All Films",
                    films: docs,
                    login: req.session.login
                });
            })
        }
    },

    viewAllJSON: function (app, req, res) {
        console.info("View All JSON controller")
        app.set('myDb').collection('filmsCollection').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
  
    getItem: function (app, req, res, view, viewTitle) {
        console.info("Get Item controller")
        let filmID = req.params.filmID;
        var o_id = new ObjectId(filmID);

        app.set('myDb').collection('filmsCollection').find({ "_id": o_id }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.render(view, {
                title: `${viewTitle} ${docs[0].filmName}`,
                film: docs[0],
                login: req.session.login
            });
        })
    },
  

    login: function (app, req, res) {

        // console.dir(req.body);
        let username = req.body.username;
        let password = req.body.password;
        //
        app
            .set("myDb")
            .collection("appUsers")
            .find({ name: username })
            .toArray(function (err, docs) {
                if (err) {
                    console.error(err);
                }
                if (docs.length > 0) {
                    ///////
                    bcrypt.compare(req.body.password, docs[0].password, function (
                        err,
                        result
                    ) {
                        console.info(result);
                        if (result == true) {
                            req.session.login = true;
                            res.redirect("/example");
                        } else {
                            res.redirect("/login");
                        }
                    });
                } else {
                    res.redirect("/login");
                }
            });

    }
    ,
    signup: function (app, req, res) {
        // console.dir(req.body);
        let username = req.body.username;
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            let hashedPwd = hash;
            let newUser = { name: username, password: hashedPwd };
            app
                .get("myDb")
                .collection("appUsers")
                .insertOne(newUser, function (err, dbResp) {
                    if (err) {
                        console.error(err);
                    }
                    if (dbResp.insertedCount === 1) {
                        res.redirect("/login");
                    } else {
                        res.redirect("/login");
                    }
                });
        });

    },

    cms: function (app, req, res) {
        console.info("CMS List controller")
        if (!req.session.login) {
            res.redirect("/login");
        } else {
            app.set('myDb').collection('filmsCollection').find({}).toArray(function (err, docs) {
                //console.dir(docs)
                if (err) {
                    console.error(err)
                }
                return res.render('cms', {
                    title: "All Films",
                    films: docs,
                    login: req.session.login
                });
            })
        }
    },

    insert: function (app, req, res) {

        return res.render('insert', {
            title: 'Add Film',
            login: req.session.login
        });
    },

    insertItem: function (app, req, res) {
        console.info("Insert Form Post controller")
        var newFilm = req.body;
        app.get('myDb').collection("filmsCollection").insertOne(newFilm,
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.insertedCount === 1) {
                      res.redirect("/cms/");

                } else {
                      res.redirect("/cms/error");
                }
            })
    },

    amendItem: function (app, req, res) {
        console.info(" Amend POST controller")
        var amendFilm = req.body;
        let filmID = amendFilm.id;
        var o_id = new ObjectId(filmID);
        app.get('myDb').collection("filmsCollection").updateOne(
            { "_id": o_id },
            { $set: { "filmName": amendFilm.filmName, "filmCertificate": amendFilm.filmCertificate } },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount === 1) {
                    res.redirect("/cms");
                } else {
                    res.redirect("/cms/error");
                }
            })
    },
   delete: function (app, req, res) {
        console.info("Delete Form controller")
        let filmID = req.params.filmID;
        var o_id = new ObjectId(filmID);

        app.set('myDb').collection('filmsCollection').find({ "_id": o_id }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.render('delete', {
                title: docs[0].filmName,
                film: docs[0],
                login: req.session.login
            });
        })
    }
}
