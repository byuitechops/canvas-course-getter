/*
 * The base object to unify the data needed by the program
 */
module.exports = class Filter {
    constructor(name, questions, answers, queryBy, queryInclude, getAnswers, doFilter) {
        this.name = name;
        this.questions = questions;
        this.answers = answers;
        this.queryBy = queryBy;
        this.queryInclude = queryInclude;
        this.getAnswers = getAnswers;
        this.doFilter = doFilter;
    }
}