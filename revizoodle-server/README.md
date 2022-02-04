# revizoodle-server

## Requirements
_Revizoodle-server_ needs to connect to a _mySQL_ database.
Just edit the `app/config/db.config.js` file.

You will find info [here](revizoodle-db/README.md) to setup a database using Docker.
You will also find demo quizzes exported from Moodle into `revizoodle-db/xml`.

## Run the server
```
node server.js
```