$(document).ready(function(){
  var startButton = $('#start-quiz');
  var container = $(".container");

  startButton.click(function(){
    var quiz = new Quiz(container);
    quiz.startQuiz();
  });
});