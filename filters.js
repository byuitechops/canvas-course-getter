const Filter = require('./filter.js')
const Inputs = require('./input.js')

let filterSubAccounts = new Filter('subAccounts', '/api/v1/accounts/1/sub_accounts')

    filterSubAccounts.doFilter(() => {
        console.log(`name: ${filterSubAccounts.name}, apiCall: ${filterSubAccounts.apiCall}.`)
        console.log(Inputs.defaults.selectSubAccount.ask + Inputs.defaults.selectSubAccount.value);
    })

    module.exports = {
        filterSubAccounts,
    }