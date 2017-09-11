function max(arr){
	if (!array.length) return [];
	var extent = [Infinity , -Infinity];;
	arr.forEach(function(val){
		extent[1]= Math.max(extent[1], val);
	});

}