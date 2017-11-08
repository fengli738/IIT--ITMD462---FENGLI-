(document).ready(function() {
  "use strict";
  //adds json content type to request
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //calls get /usersu
  var viewusers = function () {
    console.log("Hi from viewusers.");
    $.get("http://localhost:3000/users", function(data, status){
      var $output = $("<p>");
      $output.text(JSON.stringify(data));
      $(".output").html($output);
    });
  }

  //calls get /users/:userID
  var searchuser = function ($id) {
    console.log("Hello from searchuser.");
    var $link="http://localhost:3000/users/" + $id;
    //console.log($link);
    $.get($link, function(data, status){
      //console.log(data);
      var $output = $("<p>");
      $output.text("Username: " + data.name + " Email: " + data.email);
      $(".output").html($output);
    });
  }
  //post to /users
  var adduser = function ($name, $email) {
    console.log("Hello from adduser.");
    var newUser =   {'user' : {
      "name" : $name,
      "email" : $email
    }};
    $.post("http://localhost:3000/users", JSON.stringify(newUser) , function(req, res){
      //  console.log(req);
      var $output = $("<p>");
      $output.text("New userID: " + req.id);
      $(".output").html($output);

    }, "json");
  }
  //get /users/:userID/reminders
  var viewreminders = function ($id) {
    console.log("Hello from viewreminders.");
    var $link="http://localhost:3000/users/" + $id + "/reminders";
    //console.log($link);
    $.get($link, function(data, status){
      //console.log(data);
      data.forEach(function (blah) {
        var $output = $("<li>");
        $output.text("Title: " + blah.title + " Description: " + blah.description + " Created: " + blah.created)
        $(".output").append($output);
      });
    });
  }
  //post to /users/:userID/reminders
  var addreminder = function ($title, $des, $id) {
    console.log("Hello from addreminder.");
    var newRemind  =   {"reminder" : {
      "title" : $title,
      "description" : $des
    }};
    //  var $link = "http://localhost:3000/users/"+ $id +"/reminders";
    //  console.log($link);
    $.post("http://localhost:3000/users/"+ $id +"/reminders", JSON.stringify(newRemind) , function(req, res){
      //console.log(req);
      var $output = $("<p>");
      $output.text("New reminderID: " + req.id);
      $(".output").html($output);
    });
  }
  //get to /users/:userID/reminders/:reminderID
  var searchreminder = function ($iduser, $idrem) {
    console.log("Hello from searchreminder.");
    var $link="http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem;
    //console.log($link);
    $.get($link, function(data, status){
      //console.log(data);
      var $output = $("<p>");
      $output.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
      $(".output").html($output);
    });
  }
  //delete call to /users/:userID/reminders/:reminderID
  var deletereminder = function ($iduser, $idrem) {
    console.log("Hello from deletereminder.");
    var $link="http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem;
    //console.log($link);
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("reminderId: " + $idrem + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //delete call to /users/:userID
  var deleteuser = function ($iduser) {
    console.log("Hello from deleteuser.");
    var $link="http://localhost:3000/users/" + $iduser;
    //console.log($link);
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("userId: " + $iduser + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //delete to /users/:userID/reminders
  var deletereminders = function ($iduser) {
    console.log("Hello from deletereminders.");
    var $link="http://localhost:3000/users/" + $iduser + "/reminders";
    //console.log($link);
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("All reminders have been deleted for userID: " + $iduser);
        $(".output").html($output);
      }
    });
  }

  //clears output html and inputs for all tabs
  $(".clear").on("click", function() {
    $(".output").html("");
    $(".input").val("");
  });

  //click functions that call other functions
  $("#viewusers button").on("click", function() {
    // $(".output").html("");
    viewusers();
  });

  $("#searchuser button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".searchuser");
    var $id = $field1.val();
    $field1.val("");
    searchuser($id);
  });

  $("#adduser button").on("click", function() {
    //$(".output").html("");
    var $field1 = $(".addname");
    var $field2 = $(".addemail");
    var $name = $field1.val();
    var $email = $field2.val();
    $field1.val("");
    $field2.val("");
    adduser($name, $email);
  });

  $("#viewreminders button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".viewreminder");
    var $id = $field1.val();
    $field1.val("");
    viewreminders($id);
  });

  $("#addreminder button").on("click", function() {
    //$(".output").html("");
    var $field1 = $(".addtitle");
    var $field2 = $(".adddes");
    var $field3 = $(".userid");
    var $title = $field1.val();
    var $des = $field2.val();
    var $id = $field3.val();
    $field1.val("");
    $field2.val("");
    $field3.val("");
    addreminder($title, $des, $id);
  });

  $("#searchreminder button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".search");
    var $field2 = $(".searchrem");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    searchreminder($iduser, $idrem);
  });

  $("#deletereminder button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".deluser");
    var $field2 = $(".delremid");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    deletereminder($iduser, $idrem);
  });

  $("#deleteuser button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".deluserid");
    var $iduser = $field1.val();
    $field1.val("");
    deleteuser($iduser);
  });
  
  $("#deleteall button").on("click", function() {
    //  $(".output").html("");
    var $field1 = $(".delall");
    var $iduser = $field1.val();
    $field1.val("");
    deletereminders($iduser);
  });
});
