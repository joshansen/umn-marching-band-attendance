# University of Minnesota Marching Band Attendance Application

Attempt to make an attendance application for the University of Minnesota marching band.

## Getting Started

Heroku
Addons: Mongolab, Stormpath
Getting config variables
Setting them up in .env file

* Setting up password reset in Stormpath
* Setting up groups in strompath

## Strompath

	req.user =
	{
		href:,
		username:,
		email:,
		givenName:,
		middleName:,
		surname:,
		fullName:,
		status:,
		createdAt:,
		modifiedAt:,
		emailVerificationToken:,
		customData:{
			href:,
			createdAt:,
			modifiedAt:
		},
		providerData:{
			href:
		},
		directory:{
			href:
		},
		tenant:{
			href:
		},
		groups:{
			href:
		},
		applications:{
			href:
		},
		groupMemberships:{
			href:
		},
		apiKeys:{
			href:
		},
		accessTokens:{
			href:
		},
		refreshTokens:{
			href:
		}
	}

## API

### Events

* API route is /api/event
* Can GET for list of events and query for start date less than, start date greater than, created by href, created by name, type, deleted, and id
* Can PUT to update event at /api/event?id=ID
* Can POST to create one or mutltiple events in an array
* JSON things, put multiple documents, proper jquery don't use $.put, query string parameters

Use the following code in your javascript to POST and PUT

```javascript
$.ajax({
  url: '/api/event',
  type: 'POST',
  data: JSON.stringify(arrayOrObject),
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  success: successCallback,
  failure: failureCallback
})
```

#### Field Structure
	name: required
	startDateTime: required
	endDateTime: required
	description: 
	type: required required/make up
	deleted: required defualt false
	createdByUser: created automatically
	createdByHref: created automatically
	updated_at: created automatically
	created_at: created automatically