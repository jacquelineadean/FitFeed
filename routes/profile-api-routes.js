// *********************************************************************************
// profile-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the profiles
  app.get("/api/profiles", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Retrieve the profiles
    db.Profile.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  // GET route for getting the profile of a user
  app.get("/api/profiles/:id", function(req, res) {
    // Retrieve the profile associated to the user
    db.Profile.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  // POST route for saving a new profile
  app.post("/api/profiles", function(req, res) {
    // Create a new profile object
    db.Profile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      picture: req.body.picture
    })
      .then(function(dbProfile) {
        res.json(dbProfile);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // PUT route for updating profile
  app.put("/api/profiles", function(req, res) {
    db.Post.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        picture: req.body.picture
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(dbProfile) {
        res.json(dbProfile);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
