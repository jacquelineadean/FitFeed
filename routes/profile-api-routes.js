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
  // // GET route for getting the profile of the logged in user
  // app.get("/api/profile_data", function(req, res) {
  //   // Retrieve the profile associated to the user
  //   db.Profile.findOne({}).then(function(dbProfile) {
  //     res.json(dbProfile);
  //   });
  // });
  app.get("/api/profile_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Profile.findOne({}).then(function(dbProfile) {
        res.json({
          firstName: req.profile.firstName,
          lastName: req.profile.lastName,
          bio: req.profile.bio,
          photo: req.profile.photo
        });
      });
    }
  });

  // PUT route for updating profile
  app.put("/api/profile_data", function(req, res) {
    db.Profile.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio
        // picture: req.body.picture
      },
      {
        where: {
          UserId: req.user.userId
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
