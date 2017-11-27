$(document).ready(() => {
    $("#SignUpAdmin-button").click(() => {

        const newUsername = $("#inputNewUsername").val();
        const newPassword = $("#inputNewPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        SDK.User.createAdmin(newUsername, newPassword, firstName, lastName, (err, data) => {
            alert("Admin er oprettet");

        });

    })
});