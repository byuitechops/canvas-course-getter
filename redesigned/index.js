const selectFilters = require('../selectFilters.js'),
    canvas = require('canvas-api-wrapper')
var filterListFull = [
    require('./filterSubAccounts.js'),
    require('./filterTerms'),
];

module.exports = async function main(settings) {
    var filterList, url, courses;
    try {
        // ask the user what they want
        filterList = await selectFilters(filterListFull, settings);
        //  figure out what api to call
        url = await buildAPIUrl(filterList, settings);
        // build the url and make the call
        courses = await canvas.get(url);

        return await filterCourses(courses, filterList, settings);
    } catch (e) {
        console.error(e);
    };
};

async function buildAPIUrl(filterList, settings) {
    var urlBody = 'api/v1/accounts/1/courses?',
        queryList = [],
        endPoints = '';
    // figurer out which filters have endPoints to use
    endPoints += await addAPIEndpoints(filterList, settings);
    console.log('Creating Querystring')
    filterList.forEach(filter => {
        filter.includeList.forEach(include => {
            queryList.push(include);
        })
    })
    console.log('End result: ', urlBody + endPoints + queryList.toString())
    return urlBody + endPoints + queryList.toString();
}

async function addAPIEndpoints(filterList, settings) {
    // run the current endpoint
    return filterList.map(async function (filter) {
        if (filter.endPoint != null) {
            return await filter.run(settings);
        };
    })
};

async function filterCourses(courses, filterList, settings) {
    for (let i = 0; i < filterList.length; i++) {
        const filter = filterList[i];
        // run the current filter
        courses = await filter.run(courses, settings);
    };
    return courses;
};

//https://byui.instructure.com/api/v1/accounts/1/users?include%5B%5D=email&role_filter_id=4