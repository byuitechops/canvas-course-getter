const canvas = require('canvas-api-wrapper');

function getCourses() {
    let subAccounts = canvas.get('/api/v1/accounts/1/courses/by_subaccounts[<subaccount>]')
}
