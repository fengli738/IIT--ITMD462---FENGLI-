$(document).ready(function() {
  "use strict";
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //Add a new user
  $("#addUser button").on("click", function() {
    var $name = $(".name").val();
    var $email = $(".email").val();
    $(".name").val("");
    $(".email").val("");

    var newUser =   {'user' : {
      "name" : $name,
      "email" : $email
    }};
    $.post("/users", JSON.stringify(newUser) , function(req, res){
      var $screenout = $("<p>");
      $screenout.text("Id: " + req.id);
      $(".screenout").html($screenout);

    }, "json");
  });

  //Add a new reminder to a user
  $("#addReminder button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");
    var $title = $(".title").val();
    $(".title").val("");
    var $description = $(".description").val();
    $(".description").val("");

    var newReminder  =   {"reminder" : {
      "title" : $title,
      "description" : $description
    }};
    $.post("/users/" + $uid + "/reminders", JSON.stringify(newReminder) , function(req, res){
      var $screenout = $("<p>");
      $screenout.text("Id: " + req.id);
      $(".screenout").html($screenout);
    });
  });

  $("#findUser button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");
    $.get("/users/" + $uid, function(data){
      var $screenout = $("<p>");
      $screenout.text("Name: " + data.name + " Email: " + data.email);
      $(".screenout").html($screenout);
    });
  });

  $("#findReminder button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");
    var $rid = $(".reminderid").val();
    $(".reminderid").val("");
    $.get("/users/" + $uid + "/reminders/" + $rid, function(data){
      var $screenout = $("<p>");
      $screenout.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
      $(".screenout").html($screenout);
    });
  });

  //Find and screenout all reminders for a user
  $("#findAllreminder button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");

    $.get("/users/" + $uid + "/reminders", function(data){
      data.forEach(function (des){
        var $screenout = $("<li>");
        $screenout.text("Title: " + des.title + " Description: " + des.description + " Created: " + des.created);
        $(".screenout").append($screenout);
      });
    });
  });

  //Delete a user
  $("#deleteUser button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");

    $.ajax({
      url: "/users/" + $uid,
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $screenout = $("<p>");
        $screenout.text("User has been deleted");
        $(".screenout").html($screenout);
      }
    });
  });

  //Delete all reminders from a user
  $("#deleteAllreminder button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");

    $.ajax({
      url: "/users/" + $uid + "/reminders",
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $screenout = $("<p>");
        $screenout.text("All reminders have been deleted.");
        $(".screenout").html($screenout);
      }
    });
  });

  //Delete a reminder from a user
  $("#deleteReminder button").on("click", function() {
    var $uid = $(".userid").val();
    $(".userid").val("");
    var $rid = $(".reminderid").val();  
    $(".reminderid").val("");

    $.ajax({
      url: "/users/" + $uid + "/reminders/" + $rid,
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $screenout = $("<p>");
        $screenout.text("Reminder has been deleted");
        $(".screenout").html($screenout);
      }
    });
  });
});