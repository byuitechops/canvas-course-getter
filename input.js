/* 
 * This input file will be used to obtain all the user's inputs.
 * The functions will then use the inputs to dynamically create
 * API calls according to the user's specifications, returning an
 * array of API calls to make.
 */
module.exports = {
    /*
     * The defaults object is for deciding what values to set as default,
     * and whether or not to automatically submit them (reducing the 
     * need to spam the 'Enter' key). Additionally, the defaults object 
     * will allow the user to choose whether to use an existing .dsv
     * instead of Canvas for the course list.
     */
    defaults: {
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
        },
        selectSubAccount: {
            ask: true,
            value: ""
        },
    }
};