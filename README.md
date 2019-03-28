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
Include this wrapper as a way to easily get either a JSON, CSV, or merely a list of Canvas Course Objects as a return value. This wrapper will run inquirer as a means to ask the user what kind of filters they would like to apply, then construct a canvas.GET, formatting the user's inputs accordingly.

### Available Filters are:
* Filter by Sub-Account
* Filter by Term
* Filter by Course State
* Filter by Course Type
* Filter by Teacher
* Filter by Enrollment Types
* Filter by Course Status
The user can either use the CLI to choose the inputs, or use the settings object to specify default answers and how the questions with default answers will behave.

### Settings Object: 
The objective of the settings object is to allow the user to select how the CLI behaves (i.e. what questions it asks, what the default values are). The 'ask' attribute, if true, will ask the sepcified question. If false, the question will automatically enter the 'value' without asking the question in the CLI.


### Making Additions
Any time a new filter must be created, first create a new filter within the filters folder, providing this:
`Filter('name', getQuestions(), null, '', ['includes'], (function), (function))`

* name must be the same in both the settings object and the filter itself. It must also be an element of the message of the choices of the selectFilters.js question object.

* getQuestions simplly needs to return the filter's questions (because the object tends to be quite large, and sometimes the 'choices' attribute requires an additional function such as `searchSubAccounts` or `searchTerms`)


* answers is left `null` because the value is not known until the questions are asked.

* queryBy is the string found in the canvas API documentation that will need to be used by the filter (by_subaccount, enrollment_term_id, etc.)

* queryInclude is similar to the queryBy, only it will be used to filter courses after the API call has been made.

* getAnswers is a function that will return the answers (after the questions have been asked) in the correct format (such as removing the ID from the string using regex -See filterSubAccount)

* doFilter is a function that will take in a list of courses, run a .filter on them, seeing if the courses contain the queryInclude of the filter, returning true if they do, false if not.


## Description of Filters

#### Types
autoCheck is used for mutiselects that have a lot of values to choose from.

lists are used for single value selects from finite answers

checkboxes are used for multiselects with fewer values

input is used when the criteria must match the user's desired value

---

### Filter by Sub-Account (type: 'autoCheck')
Uses ```GET /api/v1/accounts/1/sub_accounts``` to get live list of subaccounts,
Then ```GET /api/v1/accounts/1/courses/by_subaccounts[]=<subaccount>``` to get the courses under the specified sub-account. 

### Filter by Term (type: 'list')
Use ```GET /api/v1/accounts/1/terms``` to get live list of terms and their enrollment_term_id,
Then ```GET /api/v1/accounts/1/courses?enrollment_term_id[]=<enrollment_term_id>``` to get a specific term.

### Filter by Course State (type: 'checkbox')
Use ```GET /api/v1/accounts/1/courses/state[]=created, claimed, available, completed, deleted, all```

### Filter by Course Type (type: 'checkbox')
Use ```GET /api/v1/accounts/1/courses/blueprint=<true/false>``` to get if blueprints
Use ```GET /api/v1/accounts/1/courses/blueprint_associated=<true/false>``` to get if has a blueprint
Use ```GET /api/v1/accounts/1/courses/published=<true/false>``` to get if published
Use ```GET /api/v1/accounts/1/courses/completed=<true/false>``` to get if completed

### Filter by Teacher (type: 'autoCheck')
Use ```GET api/v1/accounts/1/users?&role_filter_id=4``` to get live list of teachers,
Then ask the user which teacher to choose, take that teacher object's user_id.
Then ```GET /api/v1/accounts/1/courses?by_teachers[]=<user_id>``` to get that teacher's courses.

### Filter by Enrollment Type (type: 'checkbox')
Use ```GET /api/v1/accounts/1/courses/enrollment_type[]=teacher, student, ta, observer, designer```

### Filter by Course String Value (type: 'input')
Use  ```GET /api/v1/accounts/1/courses/search_term=<string>```


## TODO
Finish the Course State, Course Type, Teacher, Enrollment Type and String Value filters
