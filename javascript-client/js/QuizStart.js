$(document).ready(() => {

    SDK.User.loadNav();
    let letsQuizId = SDK.Storage.load("watchQuizId");
    let quizBody = $('#Quizbody');
    const $tjekSvar = $('#tjekSvar');
    let antalRigtigeSvar= 0;
    $tjekSvar.click((e)=>
    {
        let tjek = document.getElementById('Quizbody').getElementsByTagName("input");

        for (let i = 0; i < tjek.length; i++) {


            if (tjek(i).checked && tjek(i).value == 1) {
                antalRigtigeSvar++;
            }
        }
            window.alert("Du fik " + antalRigtigeSvar + " rigtige svar.");


    });
        SDK.Question.findAll(letsQuizId, (err, questions) => {


            questions.forEach(question => {
                getOptions(question.questionId)


                quizBody.append(`<form id=${question.questionId}> ${question.questionTitle} </form>`);

            });
        });


        function getOptions(quizId) {
            SDK.Choice.findAll(quizId, (err, choice) => {
                console.log(choice);
                let choiceListen = $("#" + quizId);
                choice.forEach(choice => {
                    choiceListen.append(`
                <input type="radio" name=${quizId} choiceId=${choice.choiceId} value=${choice.answer}> ${choice.choiceTitle}
                `);
                });
            });
        }

    $('#deletionBoxQuizzes').hide();


    if (SDK.Storage.load("type") === 2) {

        $('#deletionBoxQuizzes').show();

        $('#deleteQuizButton').click((e) => {
            e.preventDefault();
            $('#deletionBoxQuizzes').toggle();

        });

        $("#deleteQuiz").click(() => {
            const deletionQuizID = $('#deleteQuizInput').val();
            if (confirm('Er du nu helt sikker på at ' + deletionQuizID + " skal ud?")) {
                SDK.quiz.delete(deletionQuizID, (err, quiz) => {

                    if (err) {
                        alert("Brugeren blev ikke slettet da der skete en fejl! (" + err + ").");
                        $('#deleteQuizInput').val("");
                    } else {
                        alert("quizzen" + deletionQuizID + "er slettet");
                        $('#deleteQuizInput').val("");
                        $("#modal-tbody2").find('tr[data-id=' + deletionQuizID + ']').remove();
                    }

                });

            } else {
                $('#deleteQuizInput').html("");
                alert("The quiz was not deleted.")
            }

        });
    }

    
    
    
});