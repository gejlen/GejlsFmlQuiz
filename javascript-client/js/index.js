$(document).ready(() => {
    SDK.User.loadNav();

    console.log(SDK.Storage.load("User type"));

    $('#adminButton').hide();

    if (SDK.Storage.load("User type") === 2) {

        $('#adminButton').show();

    }
});