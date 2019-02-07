# canvas-course-list-getter
The end-all be-all wrapper for filtering a list of Canvas courses.

## How to Install

Standard Install

1. Clone this repository:
    ```bash
    git clone https://github.com/byuitechops/canvas-course-list-getter.git
    ```
2. Step into the folder that was just created 
    ```bash
    cd ./canvas-course-list-getter
    ```
3. To install dependancies, run:
    ```bash
    npm i
    ```

4. To initialize the program, run:
    ```bash
    npm start
    ``` 
---
## How to use this wrapper

This wrapper is designed to provide dynamic, easily maintained access to the Canvas API calls neccessary to select specific courses based on certain criteria. It uses inquirer to get input from the user in order to select certain filters, makes the requested calls, and outputs an array of canvas course objects. 
### Available Filters are:
* Filter by Sub-Account
* Filter by Term
* Filter by Course State
* Filter by Course Type
* Filter by Teacher
* Filter by Enrollment Types
* Filter by Course Status
* Filter by Other
The user can either use the CLI to choose the inputs, or use the settings and options objects to specify default answers and how the questions with default answers will behave. Additionally, the user may provide a CSV to read in to further reduce the courses being filtered.
### Defaults Object: 
This object allows you to put in string values for what choices you would like initially selected. This requires that the user be familiar enough with the format of the choices to be able either know the available choices, or the potential ones (i.e. selecting a teacher's name).
### Settings Object: 
The objective of the settings object is to allow the user to select how the CLI behaves (i.e. what questions it asks, what type of input it expects, what kind of output it produces, etc.)

---
## File Structure (Where is What)

The files are arranged thusly:
#### Main -> (Output -> Filters, Input -> Questions -> Question_Modules -> (FunctionHelpers, Template, QuestionSelectTeacher, etc.))
* input.js will handle taking in all defaults, settings and the inquirer answer hash.
* questions.js will handle the use of inquirer, asking all the questions in the question_modules folder.
* question_modules folder contains the question definitions, a template question, and a functionHelpers.js file. 
* functionHelpers.js streamlines the questions themselves, and allows certain aspects to be reused (such as validations, or when conditions) and allows for several validations or when conditions to be used in sequence using the (you guessed it) ```several``` function.
* gatherData.js is used when a question's choices must be gathered via some kind of live process.
* output.js takes the array of API-calls-to-make that input gathered and actually makes them, calling files within the filters folder. output.js will then output the resulting array of canvas Course objects in the way the user specified (simply returning as default).
* filters folder contains all the logic necessary for getting an array of canvas from each of the API called requested by the user.
### Making Additions
---

This wrapper is designed to be easily tweakable, so you can make changes and taylor it to your needs for edgecases. In order to make changes or additions to this wrapper, its important that you know where everything is, and what it does.
If I were to create a new filter, I need to start by creating an inquirer question first.
I need to first go to question_modules where I would create a new file which I will name ```questionNewQuestion.js``` for examples sake. This file will contain and export an inquirer question item which would look like this:
```javascript
module.exports = {
    type: 'input', 
    name: 'newQuestion',
    message: 'This is a new question, please answer it!',
    when: ,
    default: ,
    choices: ,
    validate: 
}
```
Now I've got a basic question, and I can require ``template.js`` for a temporary placeholder to do some testing, or use ```functionHelper.js``` if I can reuse an existing attribute, like this:
```javascript
const template = require('./template')
let funHelper = require('./functionHelpers.js');

module.exports = {
    type: 'list', 
    name: 'newQuestion',
    message: 'This is a new question, please answer it!',
    when: funHelper.when.whenSelectFilter,
    default: funHelper.defaultChoice.defSet,
    choices: ,
    validate: funHelper.validate.noBlank
```
If I don't know what my choices will entail yet, I can use ```template.choices``` for now.

Once I've decided how my choices are going to work, I need to write some code. First I've got to write a new function in the functionHelpers.js file:

```javascript
function newChoices() {
    return answers => {
      //choice array and/or logic here
    };
};
```
_Why would you need to return a function? Mainly for continuity. Several had to return a function in order to still have the answers hash created by inquierer in scope with closures, which meant I needed to return a function. To make the entire program consistent, make your new function return a function, taking 'answers' as a parameter._

Then I would add my new choices function into the module.exports at the top of funtionHelpers.js like this:
```javascript
...
choices: {
        selectFilterChoices: selectFilterChoices,
        teacherChoices: teacherChoices,
        termChoices: termChoices,
        newChoices: newChoices
    },
...
```
But what if your choices must be populated through an API call to keep them live? That is where we use ```gatherData.js``` to make API calls before we give the user their choices. We would write something like this:
```javascript
function getNewData() {
    return () => {
        let newData
        try {
            newData = canvas.get('/api/v1/accounts/1/<newApiCall>');
        } catch (err) {
            console.error(err);
        }
        return newData;
    }
}
```
_Again, every exported function returns a function so the sytax remains consistent throughout the program, and allowing existing functions to be more easily changed._

Then I could use that new dynamically created choices within my function in the ```functionHelper.js``` file like so:
```javascript
type: 'list', 
    name: 'newQuestion',
    message: 'This is a new question, please answer it!',
    when: funHelper.when.whenSelectFilter,
    default: funHelper.defaultChoice.defSet,
    choices: funHelper.choices.newChoices,
    validate: funHelper.validate.noBlank
```
After creating the question, we still need to ask it! In the questions.js file we would require the question by adding:
```javascript
const questionNewQuestion = require('./question_modules/questionNeQuestion.js');
```
Then by placing ```questionNewQuestion``` where it should be asked in the ```inquirer.prompt``` array.

NOW we're finally ready to begin programming the filter itself. We do this by creating a new file in the ```filters``` folder, we'll call it ```newFilter.js``` and then putting the logic necessary to conduct the needed API call. Once the filter has been created, you're almost done! 
```makeCalls``` in the ```output.js``` file will handle all of the API calls asked for by ```apiCalls``` in the ```input.js```, which you gave it in the ```ask``` function of the ```questions.js``` file.

####TODO figure out how to allow the necessary API calls to be extrapolated from the answers hash, the 

---
## Description of Filters

### Filter by Sub-Account
Uses ```GET /api/v1/accounts/1/sub_accounts``` to get live list of subaccounts,
Then ```GET /api/v1/accounts/1/courses/by_subaccounts[<subaccount>]``` to get the courses under the specified sub-account. 

### Filter by Term
Use ```GET /api/v1/accounts/1/terms``` to get live list of terms and their enrollment_term_id,
Then ```GET /api/v1/accounts/1/courses?enrollment_term_id=<enrollment_term_id>``` to get a specific term.

### Filter by Course State
Use ```GET /api/v1/accounts/1/courses/state[created, claimed, available, completed, deleted, all]```

### Filter by Course Type
Use ```GET /api/v1/accounts/1/courses/blueprint``` to get if blueprints

### Filter by Teacher
Use ```GET api/v1/accounts/1/users?include[]=email&role_filter_id=4``` to get live list of teachers along with their emails (in case of duplicates),
Then ```GET /api/v1/accounts/1/courses/by_teachers?include[]=<name>&``` to get that teacher's courses.

### Filter by Enrollment Types
Use ```GET /api/v1/accounts/1/courses/enrollment_type[teacher, student, ta, observer, designer]```

### Filter by Course Status


### Filter by Other
#### TODO create way for user to provide their own filter file that will handle their own API calling.

---

## TODO
Figure out how to ensure no API call gets asked twice. Any function that makes an API call needs to be overwritten to something that just returns the result of the API call instead.
```javascript
function main () {

var obj = {
    key1: ()=>1,
    key2: ()=>2,
    keyRewrite: ()=> {
        // this.keyRewrite = () => 'taco'
        return 'meep'
    },
}

console.log(obj.keyRewrite())
var moop = obj.keyRewrite();
obj.keyRewrite = () => moop+2
console.log(obj.keyRewrite())

}

main();
```

Figure out how to dynamically make the API calls based on the answers received via inquirer. 
