/* eslint-disable prettier/prettier */
$(document).ready(function () {
  // This does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $("#user-username").text(data.username);
  });

  // This does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/profile_data").then(function (data) {
    $("#profile-firstName").text(data.firstName);
    $("#profile-lastName").text(data.lastName);
    $("#profile-bio").text(data.bio);
    $("#profile-photo").src = (data.photo);
  });

  // This populates the motivational quotes
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var num = Math.floor(Math.random() * data.length);
      $("#quote").text(data[num].text);
      $("#author").text(data[num].author);
    });

  // Getting jQuery references to the profile first name, last name, bio, and form
  var profileForm = $("form.profile");
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var bio = $("textarea#body");
  // var photo = $("input#photo");

  // Declare id of User and id of Profile
  var userId;
  var UserId;

  // Add event listener to profile photo upload
  // photo.on("change", function () {
  //   var reader = new FileReader();
  //   reader.onload = function () {
  //     var img = new Image();
  //     img.src = reader.result;
  //     photoURL = img.src;
  //   };
  //   // reader.readAsDataURL(photo);
  // });

  // Add event listener for when the form is submitted
  profileForm.on("submit", function (event) {
    event.preventDefault();
    var newProfile = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      bio: bio.val().trim(),
      // photo: photoURL
      // photo: photo.val()
    };
    console.log(newProfile);
    newProfile.id = UserId;
    updateProfile(newProfile);
  });
  // Function to check which user is logged in
  function checkUser() {
    $.get("/api/user_data").then(function (data) {
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
      .then(function () {
        window.location.href = "/members";
      });
  }
});

