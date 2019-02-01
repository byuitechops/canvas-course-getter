const canvas = require('canvas-api-wrapper');
const pLimit = require('p-limit');
const input = require('./cli.js');
const limit = pLimit(20);

let apiBody = {
    base: '',
    account: '',
    specific: ''
};

let accountId = '';
let enrollments = {
    teacher: true,
    student: true,
    ta: true,
    observer: true,
    designer: true
};

let name = '';

const input = [
    limit(() => caller(`/terms`)),
    limit(() => caller(`/sub_accounts`)),
    limit(() => caller(`/courses/by_teachers[${name}]`)),
]

async function caller(bas, acc, spe) {
    if (bas !== null) {
        apiBody.base = bas;
    } else {
        bas = '/api/v1/accounts';
    }
    if (acc !== null) {
        apiBody.account = acc;
    } else {
        acc = '/1';
    }
    if (mod !== null) {
        apiBody.specific = spe;
    } else {
        mod = '/courses';
    }
    let call = apiBody.base + apiBody.account + apiBody.specific;
    try {
        return await canvas.get(call);
    } catch (err) {
        console.error(err);
    }
}

async function getAccounts() {
    return await canvas.get(apiBody.base)
}

function main() {

};