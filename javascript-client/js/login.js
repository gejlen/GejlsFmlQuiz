$(document).ready(() => {

  SDK.User.loadNav();

  $("#login-button").click(() => {

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        console.log("Noget gik galt")
      } else {
        window.location.href = "index.html";
      }
    });

  });$

  $("#SignUp-button").click(() => {

    const newUsername = $("#inputNewUsername").val();
    const newPassword = $("#inputNewPassword").val();
    const firstName = $("#inputFirstName").val();
    const lastName = $("#inputLastName").val();
      SDK.User.create(newUsername, newPassword, firstName, lastName, (err, data) => {
      window.location.href = "login.html";
      });

  })

});
