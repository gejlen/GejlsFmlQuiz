$(document).ready(() => {

    SDK.User.loadNav();
    let letsQuizId = SDK.Storage.load("watchQuizId");
    let quizBody = $('#Quizbody');
    let tjekSvar = $('#closeQuiz');
    $('#tjekSvar').click((e) => {


    console.log(letsQuizId);
    SDK.Question.findAll(letsQuizId, (err, questions) => {


            questions.forEach(question => {
            getOptions(question.questionId)


                quizBody.append(`<form id=${question.questionId}> ${question.questionTitle} </form>`);

            });
        });




    function getOptions(quizId) {
        SDK.Choice.findAll(quizId,(err,choice) => {
            let choiceListen = $("#"+ quizId);
            choice.forEach(choice => {
                choiceListen.append(`
                <input type="radio" name=${quizId} choiceId=${choice.choiceId} value=${choice.answer}> ${choice.choiceTitle}
                `);
            });
        });
    }

                    
                  
    
    
    
    
});