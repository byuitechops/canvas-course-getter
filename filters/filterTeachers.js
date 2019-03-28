const Filter = require('../filter.js'),
    fuzzy = require('fuzzy'),
    _ = require('lodash'),
    settings = require('../settings');

function searchTeachers(number) {
    var flag = true;


}

function getTeachers() {

}

async function getQuestions() {
    var questions = [{ //teacher
        type: 'input',
        name: 'TeacherNumber',
        message: 'How many Teachers will you be filtering by?',
        default: (answers) => {
            if (settings.Teacher.value != false) {
                return settings.Teacher.value;
            }
            return false;
        },
        validate: (answer) => {
            return (answer.length >= 1);
        },
        when: (answers) => {
            if (settings.Teacher.ask == true) {
                return true;
            } else if (settings.Teacher.ask == false && settings.Teacher.value != false) {
                answers.Teacher = settings.Teacher.value;
                return false;
            } else return false;
        }
    }]
    questions.push()
    return questions
}

function doFilter(courses) {
    return courses
}

function getAnswers(answers) {

}

module.exports = new Filter('Teacher', getQuestions(), null, '', ['email'], getAnswers, doFilter)
//&search_term=<term>&role_filter_id=4&include[]=