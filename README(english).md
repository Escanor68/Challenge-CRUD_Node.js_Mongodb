# Challenge-CRUD_Node.js_Mongodb

## Program operation
    1- model/class/Model.js: A class will be found, you can
     say that it will be the parent class that will be the one that has the methods required to be able to do the tasks.
    2- model/database/Mongo.js file to be able to do the
    connection to the mongodb database.
    4- node_modules folder containing all files
    that are required for the operation of the program.
    5- src/models place where all the models thought are
    for the program for example User and Company.
    6- src/routes/index.js routes connection for use
    8- src/routes/cart or product place where methods are found
    9- src/structures folder where you can find functions that
    it serves so that when a method is called, it has
    take into account some things such as that a name cannot
    be a boolean but a string and whether it is required or not.
    10- test folder where all the tests are to test the
    different scenarios of the program and see what happens at the time
    that a wrong req.body is sent among other things.
    11- package.json file where the scripts will be found,
    dependencies, repository, author data and devDependencies of the program
    12- server.js it can be said that it would be the main of the program
    where the connections are made among other things.
    13- eslint files are used when arranging things and
    Follow a design structure.

## Execution of the program

    1- Create a file with the name .env and add the following structure:
        a_ PORT (port 7020 was used for this project so it can be used too).
        b_ DB_URL (database address) would be for the database.
        c_ NAME_DATABASE (name of the database with which you want to work)

    2- Open the terminal and make sure you are in the file path where if you type 'ls' in the terminal and hit enter you should find the files
    (server.js among others).

    3- Read the package.json where you will be able to find some scripts:
        a_ npm run demon = raises the program for execution.
        b_ npm run test = the tests that would be possible scenarios will be run.
        b_ npm run test-watch = the tests that would be possible scenarios will be run but the terminal will remain up
        (it is useful when testing the program not to be running the 'npm run test' every time a new test is implemented or a test is corrected). Among others.

    4- Write npm i to be able to install all the dependencies and devDependecias.

    5- Run the program with the command npm run demon where it will appear `
    [nodemon] 2.0.18
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server.js`
    listening to port: 7020`
    which would imply that the program is running, it will be
    you can try with applications like postman which was the one
    was used to check the
    operation of the same