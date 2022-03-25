# revizoodle-server

## Requirements

_Revizoodle-server_ needs to connect to a _mySQL_ database. Set database connection info in `config/db.config.js` file.

You will find info [here](revizoodle-db/README.md) to setup a database using Docker. You will also find demo quizzes
exported from Moodle into `revizoodle-db/xml`.

## Build the server

```
npm install
```

## Run the server in development mode

```
npm run dev
```

It will start the server running typescript sources with `ts-node`.

## Transpile to javascript

```
npm compile
```

The transpiled files will be output into `dist` folder.

## Package the server for production

```
npm run package:prod
```

The packaged server will be output into `prod` folder.

Note : The `config` folder is not included into the package. You will need to provide the specific production config
files (copy, paste & update the dev config files)

## folder structure

| Folder          | Description                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------|
| `config`        | Config files                                                                                  |
| `dist`          | Transpiled js files from TypeScript sources                                                   |
| `prod`          | Production package                                                                            |
| `resources`     | Non TypeScript resources to be used by the server (including the bundled `revizoodle-client`) |
| `revizoodle-db` | Docker image of the mySql database + XML examples of Moodle Quiz                              |
| `src`           | TypeScript sources of the server                                                              |

## Config files

| File                    | Description            |
|-------------------------|------------------------|
| `config/db.config.js`   | Database configuration |
| `config/user.config.js` | Security config        |
