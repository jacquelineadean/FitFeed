var cellCount = 3; //this should evenly go into the recipe count for now.
var recipes = [];
var recipeURL = "";

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/profile_data").then(function(data) {
    $("#profile-firstName").text(data.firstName);
    $("#profile-lastName").text(data.lastName);
    $("#profile-bio").text(data.bio);
    // $("#profile-photo").file(data.photo);
  });

  fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var num = Math.floor(Math.random() * data.length);
      $("#quote").text(data[num].text);
      $("#author").text(data[num].author);
    });

  $.get(
    "https://api.spoonacular.com/recipes/random?apiKey=25d0c76b25b545718608444b6be4dccc&number=6&targetCalories=1000",
    function(data) {
      if (!data || data.length === 0) {
        alert("Sorry, unable to find any recipes, or problem with API");
        return; //exit since we have no recipes
      }

      //save the recipes display the information
      recipes = data.recipes;
      displayRecipeImages();
    }
  );

  $(document).on("click", ".show-recipe", function(e) {
    //e is the element itself
    if (!e || !e.currentTarget) {
      return;
    }

    var recipeId = e && e.currentTarget && e.currentTarget.id;
    showRecipe(recipeId);
  });

  $("#recipeWindow").on("shown.bs.modal", function() {
    //correct here use 'shown.bs.modal' event which comes in bootstrap3
    $(this)
      .find("iframe")
      .attr("src", recipeURL);
  });
});

function chunkArray(array, size) {
  var result = [];
  var arrayCopy = [].concat(array);
  while (arrayCopy.length > 0) {
    result.push(arrayCopy.splice(0, size));
  }
  return result;
}

function displayRecipeImages() {
  if (!recipes || recipes.length === 0) {
    //we have no recipes, nothing to display
    return;
  }
  $("#recipe-images").html(""); //empty the div
  var collection = chunkArray(recipes, cellCount);
  collection.forEach(function(smallArray) {
    //add a row
    var div = $("<div>", {
      class: "row my-4"
    });
    //build our recipe images display
    var recipeImages = smallArray.map(function(x) {
      console.log(x);
      //loop through the array of recipes and build an array of images
      //we only need the id for now to link to the recipe, also the image URL is based on the recipe ID
      return (
        "<div class='col show-recipe pointer text-center' id='" +
        x.id +
        "'><img class='recipe-img-small' src='https://spoonacular.com/recipeImages/" +
        x.id +
        "-312x231.jpg'><div class='show-recipe pointer' id='" +
        x.id +
        "'>Click to see recipe</div></div>"
      );
    });
    div.html(recipeImages);
    //append our recipes to the div we want
    $("#recipe-images").append(div);
  });
}

function showRecipe(recipeId) {
  if (!recipeId) {
    return;
  }

  //find the recipe in the list of recipes
  var selectedRecipe = recipes.find(function(x) {
    if (parseInt(x.id) === parseInt(recipeId)) {
      return x;
    }
  });
  //get the recipe URL
  recipeURL = selectedRecipe.spoonacularSourceUrl;
  $("#recipeWindow").modal({
    show: true
  });
}
