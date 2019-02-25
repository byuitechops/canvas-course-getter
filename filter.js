class Filter {
    constructor(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    doFilter(filter) {
        return filter();
    }
}

module.exports = Filter;