$(document).ready(function() {
  // // Getting a reference to the input field where user adds a new burger
  var $burgerName = $("input.addBurger");

  // burgerContainer holds all of our burgers
  var $burgerContainer = $("#eatMe");

  // Adding an event listener for when the form is submitted to add a new burger;
  $(document).on("submit", "#burgerForm", insertBurger);

  // Our initial burgers array
  var burgers = [];

  // Getting the Burgers list
  getBurgers();

  // This function resets the burgers displayed with new todos from the database
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs Burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item' id='addBurger'>",
        "<span>",
        burger.burgerName,
        "</span>",
        "</li>"
      ].join("")
    );

    $newInputRow.data("burger", burger);

    return $newInputRow;
  }

  // A function for handling what happens when the form to create a new burger is submitted
  function insertBurger(event) {
    event.preventDefault();
    // Constructing a newBurger object to hand to the database
    var newBurger = {
      burger_name: $burgerName.val().trim(),
      devoured: false
    };

    // Submits a new burger to the db
    $.post("/api/burgers", burger, getBurgers);
    $burgerName.val("");
  }
});
