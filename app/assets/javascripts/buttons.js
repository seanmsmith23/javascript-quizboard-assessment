  var primaryButton = "btn-primary";
  var dangerButton = "btn-danger";
  var defaultButton = "btn-default";
  var successsButton = "btn-success";

  var makeButton = function(buttonType, text){
    var button = $("<button></button>");
    button.addClass("btn");
    return button.addClass(buttonType).html(text)
  };