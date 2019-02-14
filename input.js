/* 
 * This input file will be used to obtain all the user's inputs.
 * The functions will then use the inputs to dynamically create
 * API calls according to the user's specifications, returning an
 * array of API calls to make.
 */

module.exports = {
    /*
     * The setting object is for deciding what values should be chosen
     * for default values. Answers specified in the settings object 
     * will be verified by still asking the question.
     */
    defaults: defaults = {
        //TODO after questions: write the real names for the default values the
        // user can associate with the corresponding questions
        selectFilter: {
            a: 'Setting1',
            b: 'Setting1.1',
            c: 'Setting1.2'
        },
        selectTeacher: {
            a: 'Setting1',
            b: 'Setting1.1',
            c: 'Setting1.2'
        },
        selectTerm: {
            a: 'Setting1',
            b: 'Setting1.1',
            c: 'Setting1.2'
        },
    },
    /*
     * The options object is for deciding what filters will be chosen,
     * and whether or not to automatically submit them (reducing the 
     * need to spam the 'Enter' key). Additionally, the options object 
     * will allow the user to choose whether to use an existing .dsv
     * instead of Canvas for the course list.
     */
    settings: settings = {
        selectFilter: {
            ask: true,
            value: ""
        },
        selectTeacher: {
            ask: true,
            value: ""
        },
        selectTerm: {
            ask: true,
            value: ""
        }
    }
};