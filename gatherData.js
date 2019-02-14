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
    return () => {
        let terms
        try {
            terms = canvas.get('/api/v1/accounts/1/terms');
        } catch (err) {
            console.error(err);
        }
        return terms;
    }
}

function getSubAccounts() {
    return () => {
        let subAccounts
        try {
            subAccounts = canvas.get('GET /api/v1/accounts/1/sub_accounts');
        } catch (err) {
            console.error(err);
        }
        return subAccounts;
    } 
}