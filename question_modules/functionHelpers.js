const gatherData = require('../gatherData');
const input = require('../input');

module.exports = {
    when: {
        whenSelectFilter: whenSelectFilter,
        whenTeacher: whenTeacher,
        whenTerm: whenTerm
    },
    defaultChoice: {
        defSet: input.settings.foreach(() => {
            //check settings to see what ought to be selected as the default, 
            //else select the predetermined default values.
        })
    },
    choices: {
        selectFilterChoices: selectFilterChoices,
        teacherChoices: teacherChoices,
        termChoices: termChoices
    },
    validate: {
        noBlank: noBlank,
        checkAnswer: checkAnswer
    },
    several: (checks) => {
        return (answers) => {
            return checks.every(check => {
                return check(answers);
            });
        };
    }
};

/* --When Functions--
 * When function helpers are used to streamline the process of
 * using the same when condition(s) for multiple questions.
 * Every function will check if the user has selected the
 * preceding conditions needed to ask the following question. 
 * If so, return true.
 */
function whenSelectFilter() {
    return answers => {
        console.log("whenSelectFilter")
        return true;
    };
};

function whenTeacher() {
    return answers => {
        console.log("whenTeacher")
        return true;
    };
};

function whenTerm() {
    return answers => {
        console.log("whenTerm")
        return true;
    };
};

/* --Choice Functions--
 * Choice function helpers are used to streamline the process of
 * using the same choice(s) for multiple questions.
 */

//Call the corresponding gatherData() functions, which will make the
//necessary API calls to gather a live list of the teachers.
function teacherChoices() {
    return answers => {
        let teachers = gatherData.teachers
        //TODO format the teachers API call so it can be displayed in a nice list
        return teachers;
    };
};

//Call the corresponding gatherData() functions, which will make the
//necessary API calls to gather a live list of the terms.
function termChoices() {
    return answers => {
        let terms = gatherData.terms;
        //TODO format the terms API call so it can be displayed in a nice list
        return terms;
    };
};

function selectFilterChoices() {
    return answers => {
        choices = [
            'Filter by Sub-Account',
            'Filter by Term',
            'Filter by Course State',
            'Filter by Course Type',
            'Filter by Users',
            'Filter by Enrollment Types',
            'Filter by Course Status',
            new inquirer.Separator(),
            "Filter by other"
        ];
        return choices;
    };
};

/* --Validator Functions--
 * Validator function helpers are used to streamline the process of
 * using the same validator(s) for multiple questions.
 */

//Validate there is an answer given.
//TODO find out how to make the verifications know which 'answer' out of the 'answers' hash to verify
function noBlank() {
    return answer => {
        if (answer.length > 1) {
            return true;
        }
        return "You must enter a value.";
    };
};

//Validate that the chosen answer matches one in the given list.
//TODO find out how to make the verifications know which 'answer' out of the 'answers' hash to verify
function checkAnswer(key, check) {
    return answer => {
        return answer[key] === check;
    };
};