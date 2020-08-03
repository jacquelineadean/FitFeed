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
  app.get("/api/profile_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Profile.findOne({
        where: {
          UserId: req.user.id
        }
      }).then(function(dbProfile) {
        res.json(dbProfile);
      });
    }
  });

  // PUT route for updating profile
  app.put("/api/profile_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Profile.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          bio: req.body.bio
          // photo: req.body.photo
        },
        {
          where: {
            UserId: req.user.id
          }
        }
      ).then(function(dbProfile) {
        res.json(dbProfile);
      });
    }
  });
};
