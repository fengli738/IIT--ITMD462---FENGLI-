var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var hands = 
	{'handID' : '1', 'cards' : 
[{"suit" : "spades", "rank" : "3"},
{"suit" : "hearts", "rank" : "ace"},
{"suit" : "diamonds" , "rank" : "10"},
{"suit" : "clubs" , "rank" : "7"},
{"suit" : "clubs" , "rank" : "3"}]};

app.use(bodyParser.json());

app.listen(3000, function(){
	console.log('now is on port 3000');
});

app.get('hands/:handID', function(req, res){
	var Hid = req.params.handId;
	var Hplace = Hid - 1;
	if(!hands[Hplace]){
		res.status(404);
		res.json({'Notice' : "handID not found" + Hid});
	}
	else{
		res.json(hands[Hplace]);
	}
});
app.get('hands/:handID/cards', function(req, res){
	var Hid = req.params.handID;
	var Hplace = Hid - 1;
	if(!hands[Hplace]){
		res.status(404);
		res.json({'Notice' : "handID not found" + Hid});
	}
	else{
		res.json(hands[Hplace].cards);
	} 
});
app.post('/hands', function (req, res){
  var id = {"id" : hands.length + 1};
  var newHand = req.body;
  newHand.id = id.id;
  hands.push(newHand)
  res.json(id)
});
app.put('/hands/:handID', function (req, res){
  var Hid = req.params.handID;
  var Hplace = inputId - 1;
  if(!hands[Hplace]){
    res.status(404)
    res.json({"Notice" : "handID not found: " + Hid})
  }
  else {
    var id = {"id" : hands.length+ 1};
    var newHand = req.body;
    newHand.id = id.id;
    hands[Hplace] = newHand;
    res.json("handID: " + Hid + " is updated")
  }
})

