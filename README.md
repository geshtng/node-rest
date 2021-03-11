# node-rest
A very simple REST API using NodeJS.<br>
Framework using `ExpressJS` & database using `MongoDB`
<br><br>
# Installation
```bash
$ git clone https://github.com/geshtng/node-rest
$ cd node-rest
$ npm i

# Running the server
$ npm start
# or
$ node main.js
```
<br><br>
# Installation with Docker
1. Open `config.js`
2. Modify this line:
    ```javascript
    database: 'mongodb://localhost:27017/node-rest',
    ```
    to
    ```javascript
    database: 'mongodb://mongo:27017/node-rest',
    ```
3. Docker command
    ```bash
    # Build the docker image
    $ make docker
    
    # Run
    $ make run
    
    # Stop
    $ make stop
    ```
<br><br>
# Documentation
You can see the documentation on [wiki]

   [wiki]: <https://github.com/geshtng/node-rest/wiki>