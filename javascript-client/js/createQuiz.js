$(document).ready(() => {

    SDK.User.loadNav();

    const $coursesButtons = $("#courses-buttons");
    const $addQuestion = $("#addQuestion");
    const $questionTitles = $("#questionTitles");
    const $choiceTitles = $("#choiceTitles");
    const $courseID = SDK.Storage.load("CourseId");
    const $newQuestionButton = $("#NewQuestionButton");
    const $newChoiceButton = $("#NewChoiceButton");
    const $addQuizButton = $("#addQuizButton");
    const $questionTitle = $("#questionTitle");



    $("#DIS").click(() => {

        SDK.Storage.persist("CourseId", 1);


    });
    $("#VØS").click(() => {

        SDK.Storage.persist("CourseId", 4);


    });
    $("#Makro").click(() => {

        SDK.Storage.persist("CourseId", 3);


    });
    $("#ITF").click(() => {

        SDK.Storage.persist("CourseId", 2);


    });



    $addQuizButton.click(() => {
        let quizTitel = $("#quizTitel").val();
        console.log(quizTitel);
        SDK.quiz.create(quizTitel,$courseID, (err) => {

            if  (!quizTitel){
                alert("Intast en rigtig titel");
                $("#quizTitel").val("");


            }
            else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der er fejl 401");
            }
            else if (err) {
                console.log("Fejl")
            }
            alert("Din quiz er nu gemt")
            $("#quizTitel").val("");
        })
    });

    $newQuestionButton.click(() => {
        let questionTitle = $("#NewQuestionText").val();
        console.log();
        SDK.Question.create(questionTitle, SDK.Storage.load("quizID"), (err) => {

            if  (!questionTitle){
                alert("You must enter valid question title");
                $("#NewQuestionTitle").val("");


            }
            else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error"); }
            else if (err) {
                console.log("Noget gik galt")
            }
            alert("Dit question er gemt")
            $("#NewQuestionTitle").val("");
        })
    });

    $newChoiceButton.click(() => {
        let choiceTitle = $("#NewChoice").val();
        console.log(choiceTitle);

        if  (!choiceTitle) {
            alert("Fejl i titel");
            $("#NewChoice").val("");
        }
        else if(!$('#radioTrue').is(':checked') && !$('#radioFalse').is(':checked') ) {
            alert("Er svaret sandt eller falsk?");
        }
        else if($('#radioTrue').is(':checked')){
            var answer = 1;
        }
        else if($('#radioFalse').is(':checked')){
            var answer = 0;
        }


        SDK.Choice.create(choiceTitle,answer,SDK.Storage.load("questionId"), (err) => {

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("Noget gik galt")
            }

            alert("Dit choice er gemt")
            $("#NewChoice").val("");
        })
    });

    var count = 1;
    var countChoice = 1;
    SDK.quiz.findAll((err, courses) => {
        if (err) throw err;
        courses.forEach(course => {
            $coursesButtons.append(`
       
       <dd>
            <button class="btn-info btn-block btn-lg" id=${course.courseId}>${course.courseTitel}</button>
        
            </dd>
            
      `
            );
        });
    });



    $addQuestion.click(() => {

        $questionTitles.append(`
       <li id="questionList">
            <input type="text" placeholder="Question Title" id=${count}>
          
               
             <input type="button" value="Add Choice" class="create" id="choiceTitles">
            
       </li>  
       
          
      `);
        count++;
        countChoice++;
    });

    $("#createQuizForm").delegate(".create", "click", () => {

        console.log("tillykke");
        $("#questionList").append(`
            
            <input type="text" placeholder="Choice Title">
         
      `);

    });



});