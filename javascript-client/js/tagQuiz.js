$(document).ready(() => {

    SDK.User.loadNav();

    const courseID = SDK.Storage.load("CourseId");
    console.log(courseID);

    const $quizButtons = $("#showQuiz-buttons");

    SDK.quiz.findAll(courseID, (err, quiz) => {
    if (err) throw err;
    $("tableHead") .html("Quiz:");
    quiz.forEach(quiz => {
        $quizButtons.append(`
        <dd>
        <button class="btn btn-warning btn-block" id=${quiz.quizId}>${quiz.quizTitle} </button>
        </dd>
`);
    });
    });
});