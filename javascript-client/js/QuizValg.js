$(document).ready(() => {

    SDK.User.loadNav();
    const $quizvalgbuttons = $("#QuizValg-buttons");


    SDK.Course.findAll((err, courses) => {
        if (err) throw err;
        courses.forEach(course => {
            $quizvalgbuttons.append(`
              <button class = "btn-success btn-block btn-lg" data-id=${course.courseId}>${course.courseTitel}</button>
             `
              );

            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id');
                if(id !== undefined) {
                    SDK.Storage.persist('courseId', id);
                    window.location.href = "TagQuiz.html"
                }

            })
        });
    });
    



});