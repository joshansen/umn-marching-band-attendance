# University of Minnesota Marching Band Attendance Application

Attempt to make an attendance application for the University of Minnesota marching band.

## Getting Started

Heroku
Addons: Mongolab, Stormpath
Getting config variables
Setting them up in .env file

* Setting up password reset in Stormpath
* Setting up groups in Stormpath

## Stormpath

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

### General

#### Interacting with the API via Javascript/Jquery

Use the following example (which is dependent on JQuery) to structure your javascript to POST to the API. This example POSTs an array or object, arrayOrObject, to the url, 'api/event', and calls successCallback on success and failureCallback on failure.

```javascript
$.ajax({
  url: 'api/event',
  type: 'POST',
  data: JSON.stringify(arrayOrObject),
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  success: successCallback,
  failure: failureCallback
})
```

The following javascript uses a PUT request with the above parameters.

```javascript
$.ajax({
  url: 'api/event',
  type: 'PUT',
  data: JSON.stringify(arrayOrObject),
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  success: successCallback,
  failure: failureCallback
})
```

### Events

* The url for the Events API is /api/event
* Can GET for list of events and query for start date less than, start date greater than, created by href, created by name, type, deleted, and id
* Can PUT to update event at /api/event?id=ID
* Can POST to create one or multiple events in an array
* JSON things, put multiple documents, proper JQuery don't use $.put, query string parameters

#### Field Structure

| Field | Required / Optional | Type | Additional |
|---|---|---|---|
| name | Required | String | |
| startDateTime | Required | Date ||
| endDateTime | Required | Date ||
| description | Optional | String ||
| type | Required | String | Acceptable values: required, make up |
| deleted | Required | Boolean | default: false |
| createdByUser| Required | String | created automatically |
| createdByHref | Required | String | created automatically |
| updated_at | Required | Date | created automatically |
| created_at | Required | Date | created automatically |

#### Commands

| Action | Request Type | URL | Parameters |
| --- | --- | --- | --- |
| List | GET | api/event | startDateLessThan, startDateGreaterThan, createdByUser, createdByHref, type, id, deleted |
| Update | PUT | api/event | id |
| Create | POST | api/event |  |

