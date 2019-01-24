# canvas-course-getter
The end-all be-all wrapper for selecting (or filtering a CSV of) Canvas courses.

1. Filter By Questions: 
  - String Input (Course Level, Course Code, Course Name, Course OU, Section SISID)
  - Naming Convention (Department, College, Term, Dev, Pilot, Scaled, Master, Block/Full)
  - Account (including name and number) and Subaccount (Master, Course Counsel View, File Backup, Blueprint)
  - If a course has users (how many)
  - Instructor (in enrollments)
  - Course Settings (Term)
  - Start date-End date
  - Course Status
  
Additional Questions to Filter by Items in Course:
  - Modules -> Mod Items
  - Quizzes -> Quiz Questions
  - Discussion Boards
  - Filter by Courses that use LTI/Apps

2. Description of the Defaults and Settings Objects
 - Defaults: The objective of the defaults object is to provide the user with the ability to select what value to answer the corresponding question with. For multiple-choice questions, the answers must be a string match to existing options. If an answer is not specified in the defaults object, a standard option/value will be selected.
 - Settings: The objective of the settings object is to allow the user to select how the CLI behaves (I.E. what questions it asks, what type of input it expects, what kind of output it produces, etc.)
