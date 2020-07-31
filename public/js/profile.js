/* eslint-disable prettier/prettier */
$(document).ready(function() {
  // Getting jQuery references to the profile first name, last name, bio, and form
  var profileForm = $("form.profile");
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var bio = $("textarea#body");
  var photo = $("input#photo");
  
  // Declare id of User and id of Profile
  var userId;
  var UserId;

  // Add event listener for when the form is submitted
  profileForm.on("submit", function(event) {
    event.preventDefault();
    var newProfile = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      bio: bio.val().trim(),
      photo: photo.val()
    };
    console.log(newProfile);
    newProfile.id = UserId;
    updateProfile(newProfile);
  });
  // Function to check which user is logged in
  function checkUser() {
    $.get("/api/user_data").then(function(data) {
      userId = data.id;
      console.log(userId);
      return userId;
    });
  }
  // Function to update profile
  function updateProfile(profile) {
    checkUser();
    UserId = userId;
    $.ajax({
      method: "PUT",
      url: "/api/profile_data",
      data: profile
    })
      .then(function() {
        window.location.href = "/members";
      });
  }
});

