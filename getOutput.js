const inquirer = require('inquirer'),
    fs = require('fs'),
    d3 = require('d3-dsv');

module.exports = async function selectOutput(courses) {
    var answers, questions;
    // build the question
    questions = getQuestions();
    // ask the question
    answer = await askQuestions(questions);

    switch (answer.selectOutput) {
        case 'CSV':
            {
                outputCSV(courses);
            }
        case 'JSON':
            {
                outputJSON(courses);
            }
        case 'Console':
            {
                console.log(courses);
            }
        case 'return':
            {
                return courses;
            }
    }
};

function getQuestions() {
    var question = [{ // selectOutput
        type: 'list',
        name: 'selectOutput',
        message: 'How would you like your courses output?',
        choices: [
            'CSV',
            'JSON',
            'Console',
            'return',
        ],
        default: () => {
            return 'return'
        },
        validate: (answer) => {
            return (answer.length >= 1);
        },
        when: () => {
            return true;
        }
    }];
    return question;
};

async function askQuestions(questions) {
    return await inquirer.prompt(questions).then(answers => {
        return answers;
    }).catch((e) => {
        console.log('Prompt Failed', e);
    });
};

/*
 * This function will simply format the courses 
 */
function outputCSV(courses) {
    var reducedCourses = d3.csvFormat(courses, ['id', 'sis_course_id', 'course_code', 'name'])
    fs.writeFile("courses.csv", reducedCourses, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing CSV Object to File.");
            return console.log(err);
        }
        console.log("CSV file has been saved.");
    });
}

function outputJSON(courses) {
    fs.writeFile("courses.json", JSON.stringify(courses), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}