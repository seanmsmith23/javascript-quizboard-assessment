function Quiz(container){
  this.quizNumber = 0;
  this.container = container;
  this.correct = 0;
  this.total = 0;
  this.currentQuestion = 0;
  this.questions = [];
}

Quiz.prototype.getQuizNumber = function(){
  var url = document.URL;
  var urlArray = url.split("/");
  this.quizNumber = parseInt(urlArray[urlArray.length -1]);
};

Quiz.prototype.renderQuestion = function(){
  var state = this.questions[this.currentQuestion]["description"];
  var answers = this.questions[this.currentQuestion].possible_answers;
  var self = this;

  self.container.append($("<div></div>").addClass("header"));

  $('.header').append($("<h1>" + state + "</h1>").addClass("state"));

  answers.forEach(function(element){
    self.container.append(makeButton(primaryButton, element["description"]).addClass("answer").attr('data-answer', element.correct ))
  });

  self.container.append($("<h5>" + (self.currentQuestion + 1) + "/" + self.total + "</h5>").addClass("current"));
  self.container.append($(makeButton(primaryButton, "Next").addClass("next").attr('disabled', true)));

  $('.next').click(function(){
    self.nextQuestion();
  });

  $('.answer').click(function(){
    self.scoreQuestion($(this));
    self.manageButtons($(this));
  })
};

Quiz.prototype.startQuiz = function(){
  $('#start-quiz').hide();
  this.getQuizNumber();
  var self = this;

  var promise = $.getJSON("/quizzes/" + this.quizNumber + "/questions");

  promise.success(function(questions){
    self.questions = questions;
    self.total = questions.length;
    self.renderQuestion(questions, self.currentQuestion);
  });
};

Quiz.prototype.nextQuestion = function(){
  if (this.total == (this.currentQuestion + 1)){
    this.removeQuestion();
    this.container.append("<h1>" + this.correct + " of " + this.total + " correct!");
    this.container.append("<h1>" + ((this.correct/this.total)*100) + "%");
  } else {
    this.removeQuestion();
    this.currentQuestion += 1;
    this.renderQuestion()
  }
};

Quiz.prototype.removeQuestion = function(){
  $('.header').remove();
  $('.answer').remove();
  $('.next').remove();
  $('.current').remove();
  $('.result').remove();
};

Quiz.prototype.scoreQuestion = function(clicked){
  if (clicked.attr('data-answer') == "true"){
    this.correct +=1 ;
    $('.header').append($("<h1>" + "Correct!" + "</h1>").addClass('result'))
  } else {
    $('.header').append($("<h1>" + "Incorrect!" + "</h1>").addClass('result'))
  }

  $('.answer').each(function(){
    if($(this).attr("data-answer") == "true"){
      $(this).removeClass("btn-primary").addClass("btn-success")
    } else {
      $(this).removeClass("btn-primary").addClass("btn-danger")
    }
  })
};

Quiz.prototype.manageButtons = function(clicked){
  $('.answer').each(function(){
    $(this).attr('disabled', true);
  });

  $('.next').removeAttr('disabled');

  clicked.removeAttr('disabled');
};