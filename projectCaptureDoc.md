# Project Capture Document for canvas-course-list-getter
#### Author: Seth Farr

## Background
Getting lists of Canvas courses can be difficult, on account of the many API calls and filters it may require to get exactly the right type of courses. The purpose of this tool is to provide streamlined, optimized, maintainable and repeatable access to Canvas courses.

-----

## Objectives
1. Provide the user with a easy access to a list of selectable filters to choose from.
2. Make the API calls and return a list of the courses matching the requested filtration.

-----

# Requirements

### Input Requirements

#### Source of Inputs

The primary source of inputs will be from the user during runtime. Additional inputs may be entered via the Defaults and Settings objects within the code itself. The options will be given to the user via the CLI, some of those options will be obtained from Canvas via API, some will be prepopulated (as they are unchanging) from Canvas. 

#### Definition of Inputs

the Settings object will look like this:
```
  settings 
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

The output will take the form of a Canvas Course object with varying keys. See https://canvas.instructure.com/doc/api/courses.html for more information about the Canvas Course Object.

---

### Interface

#### Type: 

CLI with Inquirer

#### 

```
Please choose your filter(s) by pressing Spacebar, press Enter once you have finished
		Filter by Sub-Account (autocorrect) 
		{
		Check the Sub-Account(s) you would like to filter by, 
		or type the account numbers seperated by commas:
			{
			Online (id: 5)
				Master Courses (id: 42)
					Course Council (id: 46)
					File Backup (id: 100)
				Semeseter Blueprint (id: 43)
					Scaled (id: 44)
					Archived id: 45)
			Campus (id: 7)
				Campus Instructor Training (id: 35)
			Sandbox (id: 8)
			Development (id: 13)
				Canvas API test (id: 17)
				Workday Tests (id: 18)
				Conversion Tool (id: 19)
				Canvas Gauntlets (id: 27)
				EnglishConnect (id: 41)
				Sub-Account Testing (id: 112)
				White Glove Migration Courses (id: 114)
				Course Removal Testing (id: 120)
			Pathway (id: 24)
				Master Courses (id: 39)
					Course Council (id: 47)
					File Backup (id: 102)
				Semester Blueprint (id: 106)
					Archived (id: 108)
					Scaled (id: 110)
					Missionary Review Courses (id: 118)
			Non-Academic (id: 25)
				Devotional (id: 96)
				Human Resources (id: 98)
				Online Instruction (id: 104)
			Manually Created Courses (id: 26)
			BYUI (id: 48)
				Accounting (id: 49)
				Economics (id: 50)
				Applied Plant Science (id: 51)
				Sociology & Social Work (id: 52)
				Design & Const Mgmt (id: 53)
				Art (id: 54)
				Animal & Food Science (id: 55)
				Engineering Technology (id: 56)
				Management (id: 57)
				Marketing (id: 57)
				Finance (id: 59)
				Biology (id: 60)
				Mechanical & Civil Eng (id: 61)
				Chemistry (id: 62)
				Home & Family (id: 63)
				Lang & Intnl Studies (id: 64)
				Computer Info Technology (id: 65)
				Communication (id: 66)
				Computer Sci & Eng (id: 67)
				Theatre and Dance (id: 68)
				Teacher Education (id: 69)
				English (id: 70)
				Human Performance & Rec (id: 71)
				Foundations (id: 72)
				Mathematics (id: 73)
				Religious Education (id: 74)
				Interdiscip. Studies (id: 75)
				Hist Geog & Polisci (id: 76)
				Geology (id: 77)
				Humanities & Philosophy (id: 78)
				General Studies (id: 79)
				Health Services (id: 80)
				Liberary (id: 81)
				ROTC (id: 82)
				Music (id: 83)
				Nursing (id: 84)
				Physics (id: 85)
				Psychology (id: 86)
			}
		Check to: (confirm)
			{
			Include all children of selected Sub-Account(s)
			}
		}
		Filter by Term (autocorrect)
		Check the Term(s) you would like to filter by:
		{
			Default Term
			Spring 2019
			etc.
		}
		Filter by Course State (created, claimed, available, completed, deleted, all) (autocorrect)
		Check the Course State(s) you would like to filter by:
		{
			created 
			claimed
			available
			completed
			deleted
		}
		Filter by Course Type (input)
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
		Filter by Enrollment Types (input)
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
