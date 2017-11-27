$(document).ready(() => {
    SDK.User.loadNav();

    $('#adminButton').hide();

    if (SDK.Storage.load("type") === 2) {

        $('#adminButton').show();

    }
});