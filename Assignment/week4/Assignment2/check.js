function containsNpair(array, what, num) {
    var count = 0;
    for (var i = 0; i < hand.length; i++) {
        if (hand[i] === what) {
            count++;
        }
        return count;
    }
    if (count = num) {
        return true;
    }
    else {
    	return false;
    }
}

 var rank = ["2","3","4","5","6","7","8","9","10","jack",
 "queen","king","ace"];
 var suit = ["spades","hearts","diamonds","clubs"];

 var containsPair = function(hand){
 	var result = false;
 	    handRanks;

 	handRanks = hand.map(function(card){
 		return card.rank;
 	});
    ranks.forEach(function(rank){
	if (containsNpair(handRanks,rank,2)){
		result = true;
	}
    });
    return result;
 };

 var containsThree = function(hand){
 	   var result = false;
 	    handRanks;

 	handRanks = hand.map(function(card){
 		return card.rank;
 	});
    ranks.forEach(function(rank){
	if (containsNpair(handRanks,rank,3)){
		result = true;
	}
    });
    return result;
 };

 var containsFour = function(hand){
 	   var result = false;
 	    handRanks;

 	handRanks = hand.map(function(card){
 		return card.rank;
 	});
    ranks.forEach(function(rank){
	if (containsNpair(handRanks,rank,4)){
		result = true;
	}
    });
    return result;
 };
 var containsFlush = function(hand){
 	   var result = false;
 	    handSuits;
 	  handSuits = hand.map(funtion(card){
 	  	return card.suit;
 	  });
 	 ranks.forEach(function(suit){
 	 	if (containsNpair(handSuits,suit,5)){
 	 		result = true;
 	 	}
 	 });
 	 return result;
 	};

 	handRanks = hand.map(function(card){
 		return card.rank;
 	});


 var containsfullhouse = function(hand){
 	   var result = false;
 	   handRanks;
 	 handRanks = hand.map(function(card){
 	 	return card.rank;
 	 });
 	 ranks.forEach(function(rank){
 	 	if ()
 	 })
 }