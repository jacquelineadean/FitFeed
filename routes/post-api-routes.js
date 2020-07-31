// *********************************************************************************
// post-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Retrieve all of the posts
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    // Create a new post object
    db.Post.create({
      activity: req.body.activity,
      body: req.body.body,
      UserId: req.user.id
    })
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
