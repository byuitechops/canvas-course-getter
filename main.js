const canvas = require('canvas-api-wrapper');
const pLimit = require('p-limit');
const input = require('./cli.js');
const limit = pLimit(20);

// choices:
// let termInfo = [{name: '',id: ''};
// let terms = canvas.get('/api/v1/accounts/1/terms')
// terms.enrollment_terms.foreach(term => { termInfo.push({ name:term.name, id:term.id}) });
// return termInfo.
// let subAccounts = canvas.get('/api/v1/accounts/1/sub_accounts')
// let coursesByTeacher = canvas.get(`/api/v1/accounts/1/courses/by_teachers[${name}]`)

async function main() {
    let teachers;
    try {
        teachers = await canvas.get('/api/v1/accounts/1/users?include[]=email&role_filter_id=4');
    } catch (err) {
        console.error(err);
    }
    console.log(teachers);
};

main();