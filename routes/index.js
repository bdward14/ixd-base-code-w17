/*
 * GET home page.
 */

// Getting our favour data
var data = require('../data.json');
var user = require('../user.json');

exports.view = function( req, res ) {
	
	var timeSort = []; //create new empty array to store all non expired favours
	var userName = user.user.name; 


	for(i=0; i<data.favours.length; i++){
		var jsonDate = data.favours[i].time;
		console.log("json"+jsonDate)
		var dateObj = new Date();
		var currentTime = dateObj.toJSON();
		var status = data.favours[i].status;

		if(userName === data.favours[i].name){
			continue; //skip this request if it is the person's who submited it
		}

		if(jsonDate < currentTime){
			data.favours[i].status = "expired";
			continue; //dont add old requests
		}

		if(status === "active" ){ //only include the favours that people can select
			timeSort[timeSort.length] = data.favours[i];

			var year = jsonDate.slice(0,4);
			console.log('year'+year);
			var month = jsonDate.slice(5,7);
						console.log('month'+month);

			var day = jsonDate.slice(8,10);
									console.log('day'+day);

			var time = jsonDate.slice(11,16);
									console.log('time'+time);

			
			/*dateObject = Date(data.favours[i].time);  //make date readable
			console.log("obj"+dateObject);
			dateString = dateObject.toString();
			console.log("str"+dateString);
			var date = dateString.slice(0, 21);*/

			timeSort[timeSort.length-1].time = month+"/"+day+"/"+year+" Time:"+time;

			console.log(timeSort[timeSort.length-1].time);
		}

	}

	var ownRequest = false; //am I requesting something
	var otherRequest = false; //am I doing something for someone

      for(i=0; i<data.favours.length; i++){
      	if(data.favours[i].name === userName && data.favours[i].status === "inProgress"){
      		ownRequest=true;
      	}

      	if(data.favours[i].from === userName && data.favours[i].status === "inProgress"){
      		otherRequest=true;
      	}

      }

	//res.render('index', timeSort) //pass in the filtered variable
	res.render('index', {
		//'name': name,
		'favours': timeSort,
		'ownRequest': ownRequest,
		'otherRequest': otherRequest
		}); 
}


exports.viewTwo = function( req, res ) {
	
	var timeSort = []; //create new empty array to store all non expired favours
	var userName = user.user.name; 


	for(i=0; i<data.favours.length; i++){
		var jsonDate = data.favours[i].time;
		var dateObj = new Date();
		var currentTime = dateObj.toJSON();
		var status = data.favours[i].status;

		if(userName === data.favours[i].name){
			continue; //skip this request if it is the person's who submited it
		}

		if(jsonDate < currentTime){
			data.favours[i].status = "expired";
			continue; //dont add old requests
		}

		if(status === "active" ){ //only include the favours that people can select
			timeSort[timeSort.length] = data.favours[i];
			
			dateObj = Date(data.favours[i].time);  //make date readable
			dateString = dateObj.toString();
			var date = dateString.slice(0, 21);

			timeSort[timeSort.length-1].time = date;
		}

	}

	var ownRequest = false; //am I requesting something
	var otherRequest = false; //am I doing something for someone

      for(i=0; i<data.favours.length; i++){
      	if(data.favours[i].name === userName && data.favours[i].status === "inProgress"){
      		ownRequest=true;
      	}

      	if(data.favours[i].from === userName && data.favours[i].status === "inProgress"){
      		otherRequest=true;
      	}

      }

	//res.render('index', timeSort) //pass in the filtered variable
	res.render('index2', {
		//'name': name,
		'favours': timeSort,
		'ownRequest': ownRequest,
		'otherRequest': otherRequest
		}); 
}