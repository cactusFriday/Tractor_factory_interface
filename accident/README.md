## Accient endpoints
--------------------
##### Content  
[Endpoints](#methods)
[1.1. List all accidents in system](#list_accidents)
[1.2. Create accident](#create_accident)
[1.3. Get accident with id](#id_accident)
[1.4. Delete certain accident](#id_accident_delete)
[2.1. List the history of editing accidents](#list_history)
[2.2. Create a history record (Edit existing accident)](#create_history)


<a name="methods"><h4>Endpoints</h4></a>
Method|Endpoint|Description|
--------|--------------------|-----------|
`GET`   |`api/v1/accident/`  |Return all existing accidents|
`POST`  |`api/v1/accident/`  |Create accident|
`GET`   |`api/v1/accident/1` |Return accident with `id=1`|
`DELETE`|`api/v1/accident/`  |Delete accident with `id=1` and all edit history|
`GET`   |`api/v1/accident/history/`|Return all edit hitory of all accidents|
`POST`  |`api/v1/accident/history/`|Create accident history record (edit existing accident)|

### 1. Accident
<a name="list_accidents"><h4>1. List all accidents in system</h4></a>
Request
`GET` `api/v1/accident/`
Response
```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "user": "admin",
            "time_appeared": "2020-01-07T19:28:40Z",
            "time_solved": null,
            "post": 11,
            "accident_class": 3,
            "description": "Инцидент изменен. Класс изменен на 3",
            "accident_history": [
                {
                    "id": 1,
                    "time_changed": "2021-10-31T15:11:57.332716Z",
                    "accident_id": 1,
                    "accident_class": null,
                    "description": "Тестовый инцидент"
                }
            ]
        }
    ]
}
```

<a name="create_accident"><h4>2. Create accident</h4></a>

Request
`POST` `api/v1/accident/`

Body
```json
{
    "time_appeared": "2021-03-08 19:28:40+00:00", 
    "time_solved": null, 
    "post": 11, 
    "accident_class": 1, 
    "description": "Test accident"
}
```
Response
```json
{
    "id": 6,
    "user": "admin",
    "time_appeared": "2021-03-08T19:28:40Z",
    "time_solved": null,
    "post": 11,
    "accident_class": 1,
    "description": "Test accident",
    "accident_history": []
}
```

<a name="id_accident"><h4>3. Get accident with id</h4></a>

Request
`GET` `api/v1/accident/2/`

Response
```json
{
    "id": 2,
    "user": "admin",
    "time_appeared": "2020-01-07T19:28:40Z",
    "time_solved": null,
    "post": 11,
    "accident_class": 3,
    "description": "Refactored",
    "accident_history": [
        {
            "id": 4,
            "time_changed": "2021-10-31T15:11:57.332716Z",
            "accident_id": 2,
            "accident_class": null,
            "description": "Тестовый инцидент"
        }
    ]
}
```

<a name="id_accident_delete"><h4>4. Delete certain accident</h4></a>

Request
`DELETE` `api/v1/accident/2/`

Returns response code `204`

### 2. Edit Accidents

<a name="list_history"><h4>1. List the history of editing accidents</h4></a>

Request
`GET` `api/v1/accident/history`
Response
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "time_changed": "2021-10-28T12:49:02.895479Z",
            "accident_id": 3,
            "accident_class": 1,
            "description": "Тестовый инцидент"
        },
        {
            "id": 2,
            "time_changed": "2021-10-28T14:20:55.233350Z",
            "accident_id": 1,
            "accident_class": 2,
            "description": "Тип травма изменен на Тип некомплектность"
        }
    ]
}
```

<a name="create_history"><h4>2. Create a history record (Edit existing accident)</h4></a>

Request
`POST` `api/v1/accident/`

Body
```json
{
    "accident_id": 2,
    "accident_class": 3,
    "description": "Refactored"
}
```
Response
```json
{
    "accident_id": 2,
    "accident_class": 3,
    "description": "Refactored"
}
```
