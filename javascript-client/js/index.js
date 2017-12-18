$(document).ready(() => {
    SDK.User.loadNav();

    $('#adminButton').hide();

    if (SDK.Storage.load("type") === 2) {

        $('#adminButton').show();

    }

    $('#adminShowUsers').hide();

    if (SDK.Storage.load("type") === 2) {

        $('#adminShowUsers').show();

    }
    let deletionId = SDK.Storage.load("userId");
    console.log(deletionId);

    $('#deleteMyUser').click(()=>{

        SDK.User.delete(deletionId, (err) => {

            if (err) {
                alert("Brugeren blev ikke slettet da der skete en fejl! (" + err + ").");
                deletionId;
            } else {
                alert("Brugeren"  + deletionId + "er ikke i blandt os mere!");
                deletionId;

            }

        });



    });


});