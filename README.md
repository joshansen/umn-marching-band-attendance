# University of Minnesota Marching Band Attendance Application

Attempt to make an attendance application for the University of Minnesota marching band.

## API

### Events

* JSON things, put multiple documents, proper jquery don't use $.put, query string parameters

```javascript
$.ajax({
  url: '/api/event',
  type: 'POST',
  data: JSON.stringify(array),
  contentType: 'application/json; charset=utf-8',
  dataType: 'json'
})
```

	createdBy:
	name:
	startDateTime:
	endDateTime:
	description: 
	type: Required/Make Up
	updated_at: automatic
	created_at: automatic