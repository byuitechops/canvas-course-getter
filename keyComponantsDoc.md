# Project Capture Document for canvas-course-list-getter
#### Author: Seth Farr

## Background
Getting lists of Canvas courses can be difficult, on account of the many API calls and filters it may require to get exactly the right type of courses. The purpose of this tool is to provide streamlined, optimized, maintainable and repeatable access to Canvas courses.

-----

## Objectives
1. Provide the user with a list of selectable filters to choose from. (Inquirer)
1.5 Provide the user with a way to make special rules to allow for repeatable/bulk use.
2. Determine what the most efficient API call is to get courses by user's specification.
3. Make the API calls and return a list of the courses matching the requested filtration. (canvas-api-wrapper)

-----

# Requirements

### Input Requirements

#### Source of Inputs

The primary source of inputs will be from the user during runtime. Additional inputs may be entered via the Defaults and Settings objects within the code itself. The options will be given to the user via the CLI, some of those options will be obtained from Canvas via API, some will be prepopulated (as they are unchanging) from Canvas. 

#### Definition of Inputs

the Defaults object will look like this:
```
  defaults 
    questionName {
      ask: boolean,
      value: var
      }
    secondQuestionName {
      ask: boolean,
      value: var
    ...
    }
```
---

### Output Requirements
#### Destination

Paragraph where/who to send outputs. To who? To where: Email, server, directly to LMS...? It would also include the steps to get access to the locations you need, such as getting added to a Trello Board, or access to a server, or the LMS.

The user will be given an option to receive the output as CSV or JSON in the defaults object. The output will be written as the chosen file to the current working directory.

#### Definition of Outputs

List here a type definition for each output? For example, if the changes are directly to the LMS, list all changes that occur. If it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. 

The output will take the form of a Canvas Course object with varying keys:
```javascript
{
  // the unique identifier for the course
  "id": 370663,
  // the SIS identifier for the course, if defined. This field is only included if
  // the user has permission to view SIS information.
  "sis_course_id": null,
  // the UUID of the course
  "uuid": "WvAHhY5FINzq5IyRIJybGeiXyFkG3SqHUPb7jZY5",
  // the integration identifier for the course, if defined. This field is only
  // included if the user has permission to view SIS information.
  "integration_id": null,
  // the unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  "sis_import_id": 34,
  // the full name of the course
  "name": "InstructureCon 2012",
  // the course code
  "course_code": "INSTCON12",
  // the current state of the course one of 'unpublished', 'available',
  // 'completed', or 'deleted'
  "workflow_state": "available",
  // the account associated with the course
  "account_id": 81259,
  // the root account associated with the course
  "root_account_id": 81259,
  // the enrollment term associated with the course
  "enrollment_term_id": 34,
  // the grading standard associated with the course
  "grading_standard_id": 25,
  // the date the course was created.
  "created_at": "2012-05-01T00:00:00-06:00",
  // the start date for the course, if applicable
  "start_at": "2012-06-01T00:00:00-06:00",
  // the end date for the course, if applicable
  "end_at": "2012-09-01T00:00:00-06:00",
  // the course-set locale, if applicable
  "locale": "en",
  // A list of enrollments linking the current user to the course. for student
  // enrollments, grading information may be included if include[]=total_scores
  "enrollments": null,
  // optional: the total number of active and invited students in the course
  "total_students": 32,
  // course calendar
  "calendar": null,
  // the type of page that users will see when they first visit the course -
  // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
  // Course Modules/Sections Page - 'assignments': Course Assignments List -
  // 'syllabus': Course Syllabus Page other types may be added in the future
  "default_view": "feed",
  // optional: user-generated HTML for the course syllabus
  "syllabus_body": "<p>syllabus html goes here</p>",
  // optional: the number of submissions needing grading returned only if the
  // current user has grading rights and include[]=needs_grading_count
  "needs_grading_count": 17,
  // optional: the enrollment term object for the course returned only if
  // include[]=term
  "term": null,
  // optional (beta): information on progress through the course returned only if
  // include[]=course_progress
  "course_progress": null,
  // weight final grade based on assignment group percentages
  "apply_assignment_group_weights": true,
  // optional: the permissions the user has for the course. returned only for a
  // single course and include[]=permissions
  "permissions": {"create_discussion_topic":true,"create_announcement":true},
  "is_public": true,
  "is_public_to_auth_users": true,
  "public_syllabus": true,
  "public_syllabus_to_auth": true,
  // optional: the public description of the course
  "public_description": "Come one, come all to InstructureCon 2012!",
  "storage_quota_mb": 5,
  "storage_quota_used_mb": 5,
  "hide_final_grades": false,
  "license": "Creative Commons",
  "allow_student_assignment_edits": false,
  "allow_wiki_comments": false,
  "allow_student_forum_attachments": false,
  "open_enrollment": true,
  "self_enrollment": false,
  "restrict_enrollments_to_course_dates": false,
  "course_format": "online",
  // optional: this will be true if this user is currently prevented from viewing
  // the course because of date restriction settings
  "access_restricted_by_date": false,
  // The course's IANA time zone name.
  "time_zone": "America/Denver",
  // optional: whether the course is set as a Blueprint Course (blueprint fields
  // require the Blueprint Courses feature)
  "blueprint": true,
  // optional: Set of restrictions applied to all locked course objects
  "blueprint_restrictions": {"content":true,"points":true,"due_dates":false,"availability_dates":false},
  // optional: Sets of restrictions differentiated by object type applied to
  // locked course objects
  "blueprint_restrictions_by_object_type": {"assignment":{"content":true,"points":true},"wiki_page":{"content":true}}
}
```

---

### Interface

#### Type: 

CLI with Inquirer

#### 

```
Please choose your filter(s) by pressing Spacebar, press Enter once you have finished
		Filter by Sub-Account (sub-accounts provided) 
		{
		Check the Sub-Account(s) you would like to filter by, 
		or type the account numbers seperated by commas:
			{
			Online (5)
				Master Courses (42)
					Course Council (46)
					File Backup (100)
				Semeseter Blueprint (43)
					Scaled (44)
					Archived (45)
			Campus (7)
				Campus Instructor Training (35)
			Sandbox (8)
			Development (13)
				Canvas API test (17)
				Workday Tests (18)
				Conversion Tool (19)
				Canvas Gauntlets (27)
				EnglishConnect (41)
				Sub-Account Testing (112)
				White Glove Migration Courses (114)
				Course Removal Testing (120)
			Pathway (24)
				Master Courses (39)
					Course Council (47)
					File Backup (102)
				Semester Blueprint (106)
					Archived (108)
					Scaled (110)
					Missionary Review Courses (118)
			Non-Academic (25)
				Devotional (96)
				Human Resources (98)
				Online Instruction (104)
			Manually Created Courses (26)
			BYUI (48)
				Accounting (49)
				Economics (50)
				Applied Plant Science (51)
				Sociology & Social Work (52)
				Design & Const Mgmt (53)
				Art (54)
				Animal & Food Science (55)
				Engineering Technology (56)
				Management (57)
				Marketing (57)
				Finance (59)
				Biology (60)
				Mechanical & Civil Eng (61)
				Chemistry (62)
				Home & Family (63)
				Lang & Intnl Studies (64)
				Computer Info Technology (65)
				Communication (66)
				Computer Sci & Eng (67)
				Theatre and Dance (68)
				Teacher Education (69)
				English (70)
				Human Performance & Rec (71)
				Foundations (72)
				Mathematics (73)
				Religious Education (74)
				Interdiscip. Studies (75)
				Hist Geog & Polisci (76)
				Geology (77)
				Humanities & Philosophy (78)
				General Studies (79)
				Health Services (80)
				Liberary (81)
				ROTC (82)
				Music (83)
				Nursing (84)
				Physics (85)
				Psychology (86)
			}
		Check to:
			{
			Include all children of selected Sub-Account(s)
			}
		}
		Filter by Term (list of terms provided)
		Check the Term(s) you would like to filter by:
		{
			Default Term
			Spring 2019
			etc.
		}
		Filter by Course State (created, claimed, available, completed, deleted, all)
		Check the Course State(s) you would like to filter by:
		{
			created 
			claimed
			available
			completed
			deleted
		}
		Filter by Course Type
		Check the Course Type(s) you would like to filter by:
		{
			blueprint
			master
			etc.
		}
		Filter by Teachers (autocomplete)
		{
			Enter the teacher's name(s) you would like to filter by (first and last name):
		}
		Filter by Enrollment Types
		Check the Enrollment Type(s) you would like to filter by:
		{
			teacher
			student
			ta
			observer
			designer
		}
		Filter by Course Status
		Check the Course Status(') you would like to filter by:
		{
			Active
			etc.
		}
```

-----

## Expectations
This tool will make getting a list of canvas course objects take no longer than 60 seconds

### Timeline
1 month

### Best Mode of Contact
Slack

### Next Meeting


### Action Items
\**Recap Meeting*\*
#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*
