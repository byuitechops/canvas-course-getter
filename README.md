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

## File Structure (Where is What)

### Making Additions

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
