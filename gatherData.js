const canvas = require('canvas-api-wrapper');

module.exports = {
    teachers: getTeachers,
    terms: getTerms,
    subAccounts: getSubAccounts
}

//Retrieve a list of teachers 
function getTeachers() {
    return () => {
        let teachers;
        try {
            teachers = await canvas.get('/api/v1/accounts/1/users?include[]=email&role_filter_id=4');
        } catch (err) {
            console.error(err);
        }
        return teachers;
    }
}

function getTerms() {
    let terms = canvas.get('/api/v1/accounts/1/terms')
    return terms
}

function getSubAccounts() {

}