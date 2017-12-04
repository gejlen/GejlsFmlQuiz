$(document).ready(() => {

    SDK.User.loadNav();
    const $quizValgEnd = $("#showQuiz-buttons");


    SDK.Course.findAll((err, quizzes) => {
        if (err) throw err;
        quizzes.forEach(quiz => {
            $quizValgEnd.append(`
              <button class = "btn-success btn-block btn-lg" data-id=${quiz.quizId}>${quiz.quizTitel}>${course.courseId}</button>
             `
            );

            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id');
                if(id !== undefined) {
                    SDK.Storage.persist('quizId', id);
                    window.location.href = "TagQuiz.html"
                }

            })
        });
    });




});