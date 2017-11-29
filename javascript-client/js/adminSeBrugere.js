$(document).ready(() => {
    const body = $('#body');

    body.html("");
    SDK.User.findAll((err, brugere) => {

    brugere.forEach((bruger) => {

        body.append(`<tr><td>${bruger.userId}</td><td>${bruger.username}</td><td>${bruger.firstName}</td><td>${bruger.lastName}</td></tr>`);
    });

    });

});

//data-id='${bruger.userId}