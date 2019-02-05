module.exports = {
    type: 'verify',
    name: 'Needs Name',
    message: 'Needs Message',
    when: () => true,
    defaultChoice: () => true,
    choices: () => [true, false],
    validate: () => true
};