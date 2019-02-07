/* 
 * This file will handle the making of API calls, and the extraction of courses
 * from the resulting data. It will use the filters within the filters folder 
 * to do this.
 */

const canvas = require('canvas-api-wrapper');

//Make all the API calls 
async function makeCalls(apiCalls) {
    let courses;
    strings = [
        'Filter by Term',
        'Filter by Course State',
        'Filter by Course Type',
        'Filter by Users',
        'Filter by Enrollment Types',
        'Filter by Course Status',
        'Filter by Other'
    ]
    apiCalls.foreach({
        if ()
    })
}