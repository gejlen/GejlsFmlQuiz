$(document).ready(() => {

    SDK.User.loadNav();
    const $quizvalgbuttons = $("#QuizValg-buttons");


    SDK.Course.findAll((err, courses) => {
        if (err) throw err;
        courses.forEach(course => {
            $quizvalgbuttons.append(`
              <dd>
              
              <button class = "btn-success btn-block btn-lg" id=${course.courseId}>${course.courseTitel}</button>
              
              </dd> 
             `

              );
        });
    });
    



});