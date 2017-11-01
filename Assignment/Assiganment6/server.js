const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var users = [];
var reminders = [];
app.use(bodyParser.json());
//console log 
app.listen(3000, function(){
	console.log('app is running on the port 3000');
});
// get userid
app.get('/users/:userid', function(req, res){
	var inputid = req.params.userid;
	var place = inputid-1
	if(!users[place]){
		res.status(404);
		res.json({'Notice' : 'userid can not be found' + inputid});
	}
	else {
		res.status(200);
		res.json(users[idplace].user);
	}
});
//get reminders
app.get('/users/:userid/reminders', function(req, res){
	var inputid = req.params.userid;
	var idplace = inputid - 1;
	if(!users[idplace]){
		res.status(404);
		res.json({'Notice' : 'userid not found' + inputid});
	}
	else {
		var reminderPlace = users[idplace].reminders.forEach(function(getStuff){
			eachReminder.push(getStuff.reminders)
		});
		res.status(200);
		res.json(eachReminder);
	}
});
//get reminderID
app.get('/users/:userid/reminders/reminderid', function (req, res){
	var inputid = req.params.userid;
	var idplace = inputid - 1;
	var noteid = req.params.reminderid;
	var noteplace = noteid - 1;
	if(!users[idplace].reminders[noteplace]){
		res.status(404);
		res.json({'Notice':"reminderid not found" + noteid});
	}
	else{
		res.status(200);
		res.json(users[idplace].reminders[noteplace].reminder);
		}
	});
// post users
 app.post('/users', function(req, res){
 	var inputid = {"id" : users.length + 1};
 	var newUser = req.body;
 	newUser.id = ID.id;
 	newUser.reminders = [ ];
 	users.push(newUser);
 	res.status(200);
 	res.json(inputid);
 });
 //post reminders
 app.post('users/:userid/reminders', function(req, res){
 	var inputid = req.params.userid;
 	var idplace = inputid-1;
 	var date = new date();
 	if(!users[idplace]){
 		res.status(404);
 		res.json({'Notice' : "userid not found" + inputid});
 	}
 	else{
 		var noteid = {"id" : users[idplace].reminders.length + 1};
 		var newReminder = req.body.newReminder;
 		newReminder.noteid = noteid.noteid;
 		newReminder.reminder.created = date;
 		users[idplace].reminders.push(newReminder);
 		res.status(200);
 		res.json(noteid); 
 	}

 });
 //delete userid
 app.delete('users/:userid', function (req, res){
 	var inputid = req.params.userid;
 	var idplace = inputid - 1;
 	if(!users[idplace]){
 		res.status(404);
 		res.json({'Notice' : 'userid not found' + userid});
    }
    else {
    	delete users[inputid];
    	res.send('204 no content');
    	res.end();
    }
 });
 //delete reminders
 app.delete('users/:userid/reminders', function(req, res){
 	var inputid = req.params.userid;
 	var idplace = inputid - 1;
 	if(!users[idplace]){
 		res.status(404);
 		res.json({'Notice' : 'userid not found' + userid});
    }
    else{
    	users[idplace].reminders = [] ;
    	res.send('204 no content');
    	res.end();
    }
 });
 // delete reminderid
 app.delete('users/:userid/reminders/reminderid', function(req, res){
 	var inputid = req.params.userid;
 	var idplace = inputid-1;
 	var noteid = req.params.reminderid;
 	var noteplace = noteid-1;
 	if(!users[idplace].reminders[noteplace]){
 		res.status(404);
 		res.json({'Notice' : 'reminderid not found' + noteid});
 	}
 	else{
 		delete users[idplace].reminders[noteplace] ;
 		res.send('204 no content');
 		res.end();
 	}

 });