//Events test
var eventTests = {
	createOne: function(){
		var object = {name: "Test 999", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" };

		$.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(object),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { console.log("Object POST succeeded with: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Object POST failed with: " + JSON.stringify(response));}
		});
	},

	createMany: function(){
		var array = [{name: "Test 8", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" }, {name: "Test 11", startDateTime: Date.now(), endDateTime: Date.now() + 5000000, description: "Sample description", type: "required" }];

		$.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(array),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { console.log("Array POST succeeded with: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Array POST failed with: " + JSON.stringify(response));}
		});
	},

	updateOne: function(){

		var object = {name: "Test 999", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" };

    $.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(object),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { test2(response._id);},
		  failure: function(response) { console.log("Could not run PUT test because POST is failing with: " + JSON.stringify(response));}
		});

		function test2(putId){
			$.ajax({
			  url: '/api/event?id=' + putId,
			  type: 'PUT',
			  data: JSON.stringify({description:"I'm an updated description"}),
			  contentType: 'application/json; charset=utf-8',
			  dataType: 'json',
			  success: function(response) { console.log("Object PUT succeeded with: " + JSON.stringify(response)); },
			  failure: function(response) { console.log("Object PUT failed with: " + JSON.stringify(response));}
			});
		}
	},

	listAll: function(){
		var list;
		$.ajax({
		  url: '/api/event',
		  type: 'GET',
		  success: function(response) { list = response; console.log("List of event records: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Object PUT failed with: " + JSON.stringify(response));}
		});
	}
};