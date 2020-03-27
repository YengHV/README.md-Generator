// Grabbing all the packages from node library/nmp packages
const inquirer = require("inquirer");
const axios = require("axios");
const api = require("./api.js");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");
// Making an array for the questions
const questions = [
    {
        //Asking for user input
        message: "What is your github username?",
        //Setting that input to "username"
        name: "username"
    },
];
//using the messages to form prompts and then using those values to hit the api
inquirer.prompt(questions, api)
//a promise after the api has been hit to start a method
.then(function ({ username }) {
// setting queryURL to eqaul the api
const queryUrl = `https://api.github.com/users/${username}`;
// axios is works simaliar to ajax
axios
// Hits the api
.get(queryUrl)
// a promise to preform after api has been hit
.then(function (response) {
    // adding values to the varibles
    const userAvatar = response.data.avatar_url;
    const userEmail = response.data.email;
    console.log(userAvatar, userEmail);
     })
     // a promise to preform after the previous function has been completed 
    .then(function () {
    // iquirer will ask prompts
    inquirer
    .prompt([
     {
    // Checkbox with make a checkbox
    type: "checkbox",
    // Will display the message
    message: "Would you like to add a badge?",
    // setting stack to the value
    name: "stack",
    choices: [
            "Yes",
             "No"
            ]
            },
            {
    // Will display message
    message: "What is your project title?",
    // set title to the name
    name: "title"
    },
    {
    // Will display message
    message: "Add a description of your project.",
    // Set description
    name: "description"
    }
    ])
// After previous action has been done, This method will begain
.then(function writeToFile(fileName, data) {
// fs is a node package
//writeFile will overwrite files
//"README.me will be the directory"
//generateMarkdown is the methods that will start when called 
//fucntion error will let us know if there is an error
    fs.writeFile("README.md", generateMarkdown,function(err) {
        if (err) {
        // If there is an errer, show us the error
            throw err;
                };
        });
        //console loged to see if this method is working
        console.log("Im Working!");
        });
    })

})


// Unfortunately, I was not able to get to this part of the assignment
// I am assumeing that function init will iniallize something 
function init() {

}

init();
