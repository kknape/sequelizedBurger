var db = require("../models");

module.exports = function(app) {
  app.get("/api/burgers", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Burger
    db.Burger.findAll({}).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  //POST route for saving a new burger entry
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create(req.body).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
};
