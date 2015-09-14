# University of Minnesota Marching Band Attendance Application

Attempt to make an attendance application for the University of Minnesota marching band.

## Getting Started

1. [Signup and get started with Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
2. Heroku create
3. Heroku addons:add Mongolab
4. Heroku addons:add Stormpath
5. Getting config variables: heroku config
6. Add config variable to .env file using the valueless template below:

		```
		MONGOLAB_URI=
		STORMPATH_API_KEY_ID=
		STORMPATH_API_KEY_SECRET=
		STORMPATH_URL=
		VERBOSE=true
		```

7. [Set up password reset route in Stormpath for your app url](https://devcenter.heroku.com/articles/stormpath#using-with-express-js-using-password-reset)
8. Create the required groups in Stormpath:
	1. Heroku addons:open stormpath,
	2. Find groups section
	3. Add groups that are listed below in the stormpath section

## Developing pages

* Publicly available libraries should be retrieved from a CDN e.g. JQuery, Bootstrap, etc.
* Javascript files should be added to public/js
* CSS files should be added to public/css
* Images should be added to public/img
* Pages (to be rendered server-side and currently being written in Jade), should be updated in views

## API

### General

#### Interacting with the API via Javascript/JQuery

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

#### URL parameters

The API often requires URL parameters to function. These parameters are listed in the commands section and should be appended to the url as follows:

```
http://base-url?parameter1=example1&parameter2=example2&parameter3=example3
```

This pattern may be continued for as many parameters as needed.

### Events

#### Field Structure

| Field | Required / Optional | Type | Additional |
|---|---|---|---|
| name | Required | String | |
| startDateTime | Required | Date ||
| endDateTime | Required | Date ||
| description | Optional | String ||
| type | Required | String | acceptable values: required, make up |
| deleted | Required | Boolean | default: false |
| createdByUser| Required | String | created automatically |
| createdByHref | Required | String | created automatically |
| updated_at | Required | Date | created automatically |
| created_at | Required | Date | created automatically |

#### Commands

| Action | Request Type | URL | Parameters |
| --- | --- | --- | --- |
| List events (results restricted by parameters) | GET | api/event | startDateLessThan, startDateGreaterThan, createdByUser, createdByHref, type, id, deleted |
| Update one event | PUT | api/event | id |
| Create one or many events | POST | api/event |  |

### Band Members

This functionality is in progress, and not currently functional

### Attendance Records

This functionality is in progress, and not currently functional

### Absence Requests

This functionality is in progress, and not currently functional

### Property

This functionality may be added at a later point

### Property Checkout

This functionality may be added at a later point

## Stormpath

### Roles

|Role|Description|
|---|---|
|admin|Full admin rights for executive staff, business manager, etc.|
|general-staff|General band staff|
|attendance-leader|Band attendance leader|
|member|Regular band member|

### Response returned form req.user for reference

```javascript
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
```