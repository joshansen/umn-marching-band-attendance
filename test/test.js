//Should make these run automtically. Possibly create a test heroku instance to do it? Display results on a webpage? Create a virtual DOM?

//Events test
var eventTests = {
	//need to test equality of returned
	createOne: function(){
		var object = {name: "Create 1 Test", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" };

		$.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(object),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { console.log("Create one event succeeded with: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Create one event failed with: " + JSON.stringify(response));}
		});
	},

	//need to test equality of returned
	createMany: function(){
		var array = [{name: "Create Many Test: 1", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" }, {name: "Create Many Test: 2", startDateTime: Date.now(), endDateTime: Date.now() + 5000000, description: "Sample description", type: "required" }];

		$.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(array),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { console.log("Create many events succeeded with: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Create many events failed with: " + JSON.stringify(response));}
		});
	},

	//need to test equality of returned
	//Make this test use promises or something other than a callback like it is
	updateOne: function(){

		var object = {name: "Update Test", startDateTime: Date.now(), endDateTime: Date.now() + 10000, description: "Sample description", type: "required" };

    $.ajax({
		  url: '/api/event',
		  type: 'POST',
		  data: JSON.stringify(object),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { test2(response._id);},
		  failure: function(response) { console.log("Could not run event update test because event create is failing with: " + JSON.stringify(response));}
		});

		function test2(putId){
			$.ajax({
			  url: '/api/event?id=' + putId,
			  type: 'PUT',
			  data: JSON.stringify({description:"I'm an updated description"}),
			  contentType: 'application/json; charset=utf-8',
			  dataType: 'json',
			  success: function(response) { console.log("Event update succeeded with: " + JSON.stringify(response)); },
			  failure: function(response) { console.log("Event update failed with: " + JSON.stringify(response));}
			});
		}
	},

	//need to test equality of returned
	//Add tests for checking to make sure all of the parameters work properly
	listAll: function(){
		var list;
		$.ajax({
		  url: '/api/event',
		  type: 'GET',
		  success: function(response) { list = response; console.log("List of event records: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("List all event records failed with: " + JSON.stringify(response));}
		});
	}
};

//member tests
var memberTests = {
	createAccount: function(){
		var object = {givenName: "Band", surname: "Member", email: "josh.h@stlf.net", section: "clarinet", part: "1",role: "member"};

		$.ajax({
		  url: '/api/band-members',
		  type: 'POST',
		  data: JSON.stringify(object),
		  contentType: 'application/json; charset=utf-8',
		  dataType: 'json',
		  success: function(response) { console.log("Create one member succeeded with: " + JSON.stringify(response)); },
		  failure: function(response) { console.log("Create one member failed with: " + JSON.stringify(response));}
		});
	}
};