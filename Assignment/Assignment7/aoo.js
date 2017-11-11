(document).ready(function() {
  "use strict";
  //adds json content type to request
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //calls get /usersu
$('#addUser button').on('click', function(){
  var $name = $('.name').val();
  var $email = $('.email').val();
  $('.name').val('');
  $('.email').val('');

  var newUser = {
    'user' : {
      'name' : $name,
      'email' : $email
    }
  };
  $.ajax({
      url: "/users/",
      type: "POST",
      data: JSON.stringify(newUser),
      contentType: "application/json",
      success: function(req) {
        var $screenout = $("<p>");
        $screenout.text("Id: " + req.id);
        $(".screenout").html($screenout);
      }
    });
}); 


$('#addRemind button').on('click' function{
  var $userid = $('.userid').val();
  var $title = $('.title').val();
  var $description = $('.description').val();
  $('.userid').val('');
  $('.title').val('');
  $('.description').val('');

  var newReminder = {
    'reminder' : {
      'title' : $title,
      'description' : $description
    }
  };
  $.ajax({
      url: "/users/" + $userid + "/Allreminder",
      type: "POST",
      data: JSON.stringify(newReminder),
      contentType: "application/json",
      success: function(req) {
        var $screenout = $("<p>");
        $screenout.text("Id: " + req.id);
        $(".screenout").html($screenout);
      }
  });
});

$('findUser button').on('click', function(){
  var $userid = $('.userid').val();
  $('.userid').val('');

  $.ajax({
    url: '/users' + $userid
    type : 'GET',
    data :'{}',
    contentType: 'application/json',
    success: function(req){
      function(data){
        var $screenout = $('<p>');
        $screenout.text('Name :' + data.name + 'Email :' + data.email);
        $(".screenout").html($screenout);
      }
    }
  });
});

$('findReminder button').on('click', function(){
  var $userid = $('.userid').val();
  var $reminderid = $('.reminderid').val();
  $('.userid').val('');
  $('.reminderid').val('');

  $.ajax({
      url: "/users/" + $userid + "/reminders" + $reminderid,
      type: "GET",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        function(data){
          var $screenout = $("<p>");
          $screenout.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
          $(".screenout").html($screenout);
        }
      }
    });
});

$('findAllreminder button').on('click', function(){
  var $userid = $('.userid').val();
  $('.userid').val('');
  $.ajax({
      url: "/users/" + $userid + "/reminders",
      type: "GET",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        function(data){
          data.forEach(function (des){
            var $display = $("<li>");
            $display.text("Title: " + des.title + " Description: " + des.description + " Created: " + des.created);
            $(".display").append($display);
          });
        }
      }
    });
});

$('#deleteUser button').on('click', function(){
  var $userid = $('.userid').val();
  $('.userid').val('');

  $.ajax({
    url : '/users/' + $userid,
    type : 'DELETE',
    data : '{}',
    contentType: 'application/json',
    success: function(req){
      var $screenout = $('<p>');
      $screenout.text('User Deleted.');
      $('.display').html($display);
    }
  });
});

$('#deleteReminder button').on('click', function(){
  var $userid = $('.userid').val();
  var $reminderid = $('.reminderid').val();
  $('.userid').val('');
  $('.reminderid').val('');

  $.ajax({
    url : '/users/' + $userid + '/reminders' + $reminderid,
    type: 'DELETE',
    data: '{}',
    contentType:'application/json',
    success : function(req){
      var $screenout = $('<p>');
      $screenout.text('This reminder is deleted');
      $('.screenout').html($display);
    }
  });
});
$('#deleteAllreminder button').on('click', function(){
  var $userid = $('.userid').val();
  $('.userid').val();

  $.ajax({
    url: '/users/' + $userid + '/reminders', 
    type:'DELETE',
    data:'{}',
    contentType:'application/json',
    success: function(req){
      var $screenout = $('<p>');
      $screenout.text('All reminder in this id deleted.');
      $('.screenout').html($screenout);
    }
  });
});
});

