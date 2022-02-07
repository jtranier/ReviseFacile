# revizoodle-server

## Requirements
_Revizoodle-server_ needs to connect to a _mySQL_ database.
Just edit the `app/config/db.config.js` file.

You will find info [here](revizoodle-db/README.md) to setup a database using Docker.
You will also find demo quizzes exported from Moodle into `revizoodle-db/xml`.

## Build the server
```
npm install
```

## Run the server
```
npm start
```

## Config files
| File                        | Description            |
| --------------------------- | ---------------------- |
| `app/config/db.config.js`   | Database configuration |
| `app/config/user.config.js` | Security config        |
