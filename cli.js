let inquirer = require("inquirer");
const canvas = require('canvas-api-wrapper');



function asker() {

    let settings = {

    }
    let options = {

    }
    /*
     * prompt
     * 
     * This function uses the inquirer npm package to receive 
     * input from the user in command line.
     */
    inquirer.prompt([
            /* Pass your questions in here */
            { //First Question
                type: 'rawlist', //Multiselect? try 
                name: 'filterSelect',
                message: 'Please choose your filter(s) by pressing Spacebar, press Enter once you have finished:',
                when: function (answers) {
                    //condition based on previous questions.
                    return true;
                },
                default: function (answers) {
                    settings.foreach(() => {
                        //check settings to see what ought to be selected as the default, 
                        //else select the predetermined default values.
                    })
                    return true;
                },
                choices: function (answers) {
                    options = [
                        'Filter by Sub-Account',
                        'Filter by Term',
                        'Filter by Course State',
                        'Filter by Course Type',
                        'Filter by Users',
                        'Filter by Enrollment Types',
                        'Filter by Course Status',
                        new inquirer.Separator(),
                        "Filter by other"
                    ]
                    return options;
                },
                validate: function (answer) {
                    if (answer !== null) { //is valid value 
                        return true
                    } else return "That answer did not meet the criteria, try again." //use error message
                }
            },
            {
                type: 'autocomplete',
                name: 'filterByUsers',
                message: "Select a value from the list, enter user's name manually, or enter their User ID:",
                when: function (answers) { //Filter by Users is true

                },
                default: function (answers) { //No value selected

                },
                choices: function (answers) { //programmatically get a list
                    let teachers = canvas.get('/api/v1/accounts/1/users?include[]=email&role_filter_id=4');
                },
                validate: function (answer) {

                }
            }
        ])
        .then(answers => {
            // Use user feedback to make API calls
            console.log(JSON.stringify(answers, null, "  "));
        });
}