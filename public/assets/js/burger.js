$(document).ready(function() {
  // Getting jQuery references to the burger name,
  var burgerName = $("#addBurger");
  var burgerForm = $("#newBurger");

  // burgerContainer holds all of our burgers
  var burgerContainer = $("#eatMe");

  // Adding an event listener for when the form is submitted to add a new burger;
  $(burgerForm).on("submit", handleFormSubmit);
  console.log("newBurger");
  // Gets the part of the url that comes after the "?" (which we have if we're updating)
  var url = window.location.search;
  var burgerId;

  // A function for handling what happens when the form to create a new burger is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the burger if it's missing the name
    if (!burgerName.val().trim()) {
      return;
    }
  }
  // Getting the Burgers list
  getBurgers();

  // Constructing a newBurger object to hand to the database
  var newBurger = {
    burger_name: burgerName.val().trim(),
    devoured: false
  };

  submitBurger(newBurger);

  // Submits a new burger
  function submitBurger(burger) {
    $.post("/api/burgers", burger, function() {
      window.location.href = "*";
    });
  }

  // A function to get the Burgers, then renders the list of Burgers
  function getBurgers() {
    $.get("/api/burgers", renderBurgerList);
  }

  // Function to render a list of burgers
  function renderBurgerList(data) {
    if (!data.length) {
      window.location.href = "*";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(data[i]);
    }
    burgerName.empty();
    console.log(rowsToAdd);
    console.log(burgerName);
    burgerName.append(rowsToAdd);
  }
});
