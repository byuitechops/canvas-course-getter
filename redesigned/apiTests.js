const canvas = require('canvas-api-wrapper');
const inquirer = require('inquirer');

apibody = '/api/v1/accounts/1/courses?'

var filters = {
    enrollment: 'enrollment_type[]=<teacher, student, ta, observer, designer>',
    state: 'state[]=<created, claimed, available, completed, deleted, all>',
    subAccount: 'by_subaccounts[]=<subaccount>',
    bluePrint: 'blueprint=true',
    term: 'include[]=term',
}

otherAPIs = {
    teachers: '/api/v1/accounts/1/users?role_filter_id=4',
    subAccounts: '/api/v1/accounts/1/courses?include[]=subaccount',
    // /api/v1/courses/:course_id/blueprint_templates/:template_id/associated_courses
    // /api/v1/courses/:course_id/blueprint_subscriptions
}

//api/v1/accounts/1/courses?enrollment_term_id=<number>
//&search_by=teacher
//&include[]=teachers
//&include[]=subaccount
//&include[]=term