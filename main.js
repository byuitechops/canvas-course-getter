const canvas = require('canvas-api-wrapper');

const input = require('./input.js');
const output = require('./output.js');

const pLimit = require('p-limit');
const limit = pLimit(20);

async function main() {
    var callList = input.apiCalls
    var courses = output.makeCalls(callList);
    output.display(courses);
};

// function test1() {
//     let teachers;
//     try {
//         teachers = await canvas.get('/api/v1/accounts/1/users?include[]=email&role_filter_id=4');
//     } catch (err) {
//         console.error(err);
//     }
//     console.log(teachers);
// }

// function test2() {

// }

main();