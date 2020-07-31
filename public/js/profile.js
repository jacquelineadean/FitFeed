$(document).ready(function() {
  // Getting jQuery references to the profile first name, last name, bio, and form
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var bio = $("input#body");
  var form = $("form.id");
  // Add event listener for when the form is submitted
  form.on("submit", function(event) {
    event.preventDefault();
    var profile = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      bio: bio.val().trim()
    };
    updateProfile(profile.firstName, profile.lastName, profile.bio);
  });
  // Function to check which user is logged in
  function checkUser() {
    var userId;
    $.get("/api/user_data").then(function(data) {
      userId = data.id;
      console.log(userId);
      return userId;
    });
  }

  // A function for posting to the update profile route
  function updateProfile(firstName, lastName, bio) {
    checkUser();
    console.log(userId);
    $.put("/api/profile_data", {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      UserId: userId
    }).then(function() {
      window.location.replace("/members");
    });
  }
});
