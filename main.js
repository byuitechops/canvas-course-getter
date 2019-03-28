const selectFilters = require('./selectFilters'),
    canvas = require('canvas-api-wrapper'),
    inquirer = require('inquirer'),
    settings = require('./settings'),
    formurlencoded = require('form-urlencoded').default;
inquirer.registerPrompt('autoCheck', require('inquirer-checkbox-plus-prompt'));

//list of all filters
var filterListFull = [
    require('./filters/filterSubAccounts.js'),
    require('./filters/filterTerms.js'),
]

async function main(filterListFull, settings) {
    var answers = [],
        filterList = [],
        questions = [],
        courses = [];
    //selectFilters() has its own internal prompt that allows the user to select the
    //filters they wish to run, filtering off any prompts not chosen.
    filterList = await selectFilters(filterListFull, settings);
    questions = await getQuestions(filterList);
    answers = await askQuestions(questions);
    assignAnswers(filterList, answers);
    courses = await makeAPIURL(filterList);
    console.log(courses);
    // return courses.filter(filterList.map(filterObj => {
    //     return filterObj.doFilter(courses);
    // }));
}

/*
 * This function's purpose is to get all the questions from the selected filter(s).
 * Typically, it is best to have each filter return only one question, and handle any
 * other logic internally.
 */
async function getQuestions(filterList) {
    var questions = [];
    await filterList.forEach(async filter => {
        //handle for more than one question
        if (filter.questions.length >= 1) {
            for (var i = 0; i < filter.questions.length; i++) {
                var question = await filter.questions[i]
                questions.push(question)
            }
        }
        //otherwise, just push it on 
        else {
            var question = await filter.questions
            questions.push(question)
        };

    })
    return questions;
}

/*
 * This function will simply make the inquirer prompt with the questions obtained
 * through the getQuestions function.
 */
async function askQuestions(questions) {
    //run the prompt. Typically, all filters will rely on this function to run their
    //questions. Under certain circumstances, they may need to run part or all of 
    //their own questions internally.
    return await inquirer.prompt(questions).then(answers => {
        return answers;
    }).catch((e) => {
        console.log('Prompt Failed', e);
    });
}

/*
 * This function's purpose is to iterate through the list of filters
 * chosen by the user, and assign the proper answer to it based on the
 * 'name' attribute of the question (see the filter's getQuestions method)
 */
function assignAnswers(filterList, answers) {
    //turn the answers array into an iterable object
    var keys = Object.keys(answers);
    //for each filter, compare every answer's 'name' to the filter's 'name'
    filterList.forEach(filter => {
        for (var i = 0; i < keys.length; i++) {
            if (filter.name == keys[i]) {
                //set the filter's 'answer' through it's getAnswers method, 
                //which handles formatting of the answer
                filter.answers = filter.getAnswers(answers[keys[i]]);
            };
        };
    });
    return;
};

/*
 * This function will both construct an object to be formatted into an API call
 * from the filter's answers attribute (see the Filter object for reference) and 
 * it will make the actual call itself.
 */
async function makeAPIURL(filterList) {
    //the endpoint will never change. If a different endpoint is needed, it is
    //advised to do this within the individual filter itself.
    var urlBody = '/api/v1/accounts/1/courses?',
        query = {};
    formurlSettings = {
        ignorenull: true,
        skipIndex: true,
        sorted: true
    }
    //for each filter in the list, if it has a queryBy, or an queryInclude, add that 
    //filters' attribute to the query object, along with the corresponding answer
    filterList.map(filter => {
        if (filter.queryBy != null) {
            query[filter.queryBy] = filter.answers;
        };
        if (filter.queryIncludes != null) {
            query.include.push(filter.queryIncludes);
        };
    });
    //format the object into a querystring, and format it to make it more readable
    query = formurlencoded(query, formurlSettings);
    query = query.toString();
    query = decodeURI(query)
    //make the resulting call
    console.log(`Resulting URL: ${urlBody + query}`);
    return await canvas.get(urlBody + query).catch((e) => {
        console.log(`Error making specified Canvas API call: ${e}`)
    });
};

main(filterListFull, settings);