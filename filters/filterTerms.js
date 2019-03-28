const Filter = require('../filter.js'),
    fuzzy = require('fuzzy'),
    _ = require('lodash'),
    settings = require('../settings.js'),
    canvas = require('canvas-api-wrapper');

    /*
     * This function will serve as the choice generator for the filter's questions.
     */
async function searchTerms(answerSoFar, input) {
    console.log('Populating Term List...');
    //API call to get the terms
    var terms = await canvas.get('/api/v1/accounts/1/terms');
    var termdata = [];
    //format the data for understandability
    terms.forEach(term => {
        termdata.push(`${term.name}, (id: ${term.id})`);
    });
    input = input || '';
    return new Promise(resolve => {
        setTimeout(() => {
            //fuzzify the search
            var fuzzyResult = fuzzy.filter(input, termdata);
            resolve(fuzzyResult.map(el => {
                return el.original;
            }));
        }, _.random(30, 500));
    });
};

/* 
 * This function will simply return the questions needed by this filter.
 * It uses the searchTerms function to provide the question's choices.
 */
async function getQuestions() {
    questions = { //term
        type: 'list',
        name: 'Term',
        message: 'Select the Term you would like to filter by:',
        choices: searchTerms,
        searchable: true,
        pageSize: 10,
        default: (answers) => {
            if (settings.Term.value != false) {
                return settings.Term.value;
            } else return false;
        },
        validate: (answer) => {
            return (answer.length >= 1)
        },
        when: async (answers) => {
            if (settings.Term.ask) {
                return true;
            } else if (settings.Term.ask == false && settings.Term.value != false) {
                answers.Term = settings.Term.value;
                return false;
            } else return false;
        }
    };
    return await questions;
};

/*
 * This filter doesn't have any post-API filtering to do.
 */
function doFilter(courses) {
    //some filters may have a courses.filter here if they involve an include[]
    return courses
}

/*
 * Simply return the datafied answer.
 */
function getAnswers(answer) {
    //get any number of consecutive digits following an 'id: '
    var regex = /(?<=id:\s)(\d+)/;
    //get the subaccount ID from the answer, and parse it into a number
    return parseInt(answer.match(regex)[0]);
}

module.exports = new Filter('Term', getQuestions(), null, 'enrollment_term_id', null, getAnswers, doFilter);