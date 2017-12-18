$(document).ready(() => {
    $('#deletionBoxUsers').hide();


    if (SDK.Storage.load("type") === 2) {

        $('#deleteUserButton').show();

        $('#deleteUserButton').click((e) => {
            e.preventDefault();
            $('#deletionBoxUsers').toggle();

        });

            $("#deleteuser").click(() => {
                const deletionUserID = $('#deleteUserInput').val();
                if (confirm('Er du nu helt sikker på at ' + deletionUserID + " skal ud?")) {
                    SDK.User.delete(deletionUserID, (err) => {

                        if (err) {
                            alert("Brugeren blev ikke slettet da der skete en fejl! (" + err + ").");
                            $('#deleteUserInput').val("");
                        } else {
                            alert("Brugeren"  + deletionUserID + "er ikke i blandt os mere!");
                            $('#deleteUserInput').val("");
                            $("#modal-tbody2").find('tr[data-id=' + deletionUserID + ']').remove();
                        }

                    });

                } else {
                    $('#deleteUserInput').html("");
                    alert("The user was not deleted.")
                }

            });



        const body = $('#body');

        body.html("");
        SDK.User.findAll((err, brugere) => {

            brugere.forEach((bruger) => {

                body.append(`<tr><td>${bruger.userId}</td><td>${bruger.username}</td><td>${bruger.firstName}</td><td>${bruger.lastName}</td></tr>`);
            });

        });

    }
});


