const Filter = require('../filter.js'),
    fuzzy = require('fuzzy'),
    _ = require('lodash'),
    settings = require('../settings');

/*
 * This function is called by getQuestions as the value on the 'source' key. It will
 * provide the list of choices, and the fuzzy-searching function.
 */
function searchSubAccounts(answerSoFar, input) {
    //TODO replace choices with API call to get and format a live list of subAccounts.
    var choices = [
        'Online (id: 5)',
        '\tMaster Courses (id: 42)',
        '\t\tCourse Council (id: 46)',
        '\t\tFile Backup (id: 100)',
        '\tSemeseter Blueprint (id: 43)',
        '\t\tScaled (id: 44)',
        '\t\tArchived (id: 45)',
        'Campus (id: 7)',
        '\tCampus Instructor Training (id: 35)',
        'Sandbox (id: 8)',
        'Development (id: 13)',
        '\tCanvas API test (id: 17)',
        '\tWorkday Tests (id: 18)',
        '\tConversion Tool (id: 19)',
        '\tCanvas Gauntlets (id: 27)',
        '\tEnglishConnect (id: 41)',
        '\tSub-Account Testing (id: 112)',
        '\tWhite Glove Migration Courses (id: 114)',
        '\tCourse Removal Testing (id: 120)',
        'Pathway (id: 24)',
        '\tMaster Courses (id: 39)',
        '\t\tCourse Council (id: 47)',
        '\t\tFile Backup (id: 102)',
        '\tSemester Blueprint (id: 106)',
        '\t\tArchived (id: 108)',
        '\t\tScaled (id: 110)',
        '\t\tMissionary Review Courses (id: 118)',
        'Non-Academic (id: 25)',
        '\tDevotional (id: 96)',
        '\tHuman Resources (id: 98)',
        '\tOnline Instruction (id: 104)',
        'Manually Created Courses (id: 26)',
        'BYUI (id: 48)',
        '\tAccounting (id: 49)',
        '\tEconomics (id: 50)',
        '\tApplied Plant Science (id: 51)',
        '\tSociology & Social Work (id: 52)',
        '\tDesign & Const Mgmt (id: 53)',
        '\tArt (id: 54)',
        '\tAnimal & Food Science (id: 55)',
        '\tEngineering Technology (id: 56)',
        '\tManagement (id: 57)',
        '\tMarketing (id: 58)',
        '\tFinance (id: 59)',
        '\tBiology (id: 60)',
        '\tMechanical & Civil Eng (id: 61)',
        '\tChemistry (id: 62)',
        '\tHome & Family (id: 63)',
        '\tLang & Intnl Studies (id: 64)',
        '\tComputer Info Technology (id: 65)',
        '\tCommunication (id: 66)',
        '\tComputer Sci & Eng (id: 67)',
        '\tTheatre and Dance (id: 68)',
        '\tTeacher Education (id: 69)',
        '\tEnglish (id: 70)',
        '\tHuman Performance & Rec (id: 71)',
        '\tFoundations (id: 72)',
        '\tMathematics (id: 73)',
        '\tReligious Education (id: 74)',
        '\tInterdiscip. Studies (id: 75)',
        '\tHist Geog & Polisci (id: 76)',
        '\tGeology (id: 77)',
        '\tHumanities & Philosophy (id: 78)',
        '\tGeneral Studies (id: 79)',
        '\tHealth Services (id: 80)',
        '\tLiberary (id: 81)',
        '\tROTC (id: 82)',
        '\tMusic (id: 83)',
        '\tNursing (id: 84)',
        '\tPhysics (id: 85)',
        '\tPsychology (id: 86)'
    ]
    input = input || '';
    return new Promise(resolve => {
        setTimeout(() => {
            var fuzzyResult = fuzzy.filter(input, choices);
            resolve(fuzzyResult.map(el => {
                return el.original;
            }));
        }, _.random(30, 500));
    });
};

/*
 * This function will simply return the questions needed by this filter.
 * TODO This is one of the filters that has two questions in it. Currently, the second
 * question is not working. will have to change formatting so the filter's answer is
 * an array of answers, then change the handling in main.js to handle this edgecase.
 */
function getQuestions() {
    var questions = [{ //subAccount
            type: 'autoCheck',
            name: 'Sub-Account',
            message: 'Check the Sub-Account(s) you would like to filter by (or type course names/account numbers to search):',
            source: searchSubAccounts,
            searchable: true,
            pageSize: 10,
            default: (answers) => {
                if (settings['Sub-Account'].value != false) {
                    return settings['Sub-Account'].value;
                }
                return false;
            },
            validate: (answer) => {
                return (answer.length >= 1);
            },
            when: (answers) => {
                if (settings['Sub-Account'].ask == true) {
                    return true;
                } else if (settings['Sub-Account'].ask == false && settings['Sub-Account'].value != false) {
                    answers['Sub-Account'] = settings['Sub-Account'].value;
                    return false;
                } else return false;
            }
        },
        { //includeChildren
            type: 'confirm',
            name: 'includeChildren',
            message: 'Do you want to include the Sub-Accounts under the Accounts you have selected? \n(This includes ALL children, grandchildren etc.)\n',
            default: (answers) => {
                if (settings.includeChildren.value != false) {
                    return settings.includeChildren.value;
                }
                return false;
            },
            validate: (answer) => {
                return (answer.length >= 1);
            },
            when: (answers) => {
                if (settings.includeChildren.ask == true) {
                    return true;
                } else if (settings.includeChildren.ask == false && settings.includeChildren.value != false) {
                    answers.includeChildren = settings.includeChildren.value;
                    return false;
                } else return false;
            }
        }
    ];
    return questions;
}

/*
 * This filter doesn't have any post-API filtering to do.
 */
function doFilter(courses) {
    //some filters may have a courses.filter here if they involve an include[]
    return courses;
}

/*
 * Simply return the datafied answer.
 */
function getAnswers(answers) {
    //get any number of consecutive digits following an 'id: '
    var regex = /(?<=id:\s)(\d+)/;
    return answers.map(answer => {
        //get the subaccount ID from the answer, and parse it into a number
        return parseInt(answer.match(regex)[0]);
    })
}

module.exports = new Filter('Sub-Account', getQuestions(), null, 'by_subaccounts', null, getAnswers, doFilter);