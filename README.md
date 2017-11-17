![Front-End Checklist Logo](https://github.com/jumbocodefall2017/PeopleMakingADifference/blob/wireframes/TealLogo.png)


# People Making A Difference - JumboCode Fall 2017

## App Description:

This app facilitates the check-in and check-out process for volunteers and notifies them about their roles and where they should be during their shifts. Hence, it has a back end that processes the data, front end desktop for the administrator to edit the information, and the front end mobile that displays the most up-to-date information to the volunteers.

## Group Members:
*[Meeting minutes and attendance](https://docs.google.com/document/d/1N00NRzfpxZeS0YZdeWgylskesGnfoaIyY7nKHNsEuiQ/edit?ts=59dc25a2)*

*[Workboard](https://trello.com/b/IyjLEkna/jumbocode-2017-pmd)*

1. **Project Lead:** [John Gallagher](http://www.johnjamesgallagher.com/)
2. **Mobile Lead:** [Joseph Higgins](https://adma.re/)
3. **UX/Design/Developer:** [Anna Kasagawa](http://kasagawa.github.io)
4. **UX/Design/Secretary/Developer:** [Lexi Walker](https://github.com/lexi-walker)
5. **Developer:** [Meet Patel](https://github.com/Meetia)
6. **Developer:** [Phoebe Yang](https://yyang08.github.io)
7. **Continuous Integration/Developer:** [Kate Zheng](https://github.com/katepx2015)
8. **Developer:** [Julia Hedrick](https://github.com/juliahedrick) 
9. **Developer:** [Michael Dunkelman](https://github.com/mdunkelman)
10. **Documentation/Developer:** [Josh Lee](http://joshleetufts.com/)
11. **Developer:** [Bhushan Suwal](https://github.com/bsuwal)
12. **Developer:** [Kevin Bae](https://github.com/kevinbae15)

## Overview of the Project

The project consists of three major parts: the backend (which utilizes the database), the desktop frontend, and the mobile frontend.
The backend is built on Node.js and Express, with the MongoDB database service running.
The frontend desktop is built on Angular.
The frontend mobile is built on Ionic.

# Instruction Guideline

List of installation guidelines and instructions to run the different parts of the PMD project.

* [Database](#database) - This is a part of the backend in reality, but the install and run instructions are separate.
* [Back End](#back-end)
* [Desktop Front End](#desktop-front-end)
* [Mobile Front End](#mobile-front-end)

# Install Guidelines

### Before you do anything else:
* Install [node](https://nodejs.org/en/download/), which comes with node package manager. Npm is important for installing both pieces of the frontend and the backend.

## Database
  ### To Install:
  * Requirements: none, can be installed from within any directory
  * Commands: download [here](https://www.mongodb.com/download-center?jmp=homepage#community), Google the commands to set the right acess for your OS (it varies)
  
 ### To Run MongoDB:
 * Requirements: none, can be run from within any directory
 * Command: **mongod**
  
 ### To Create Database:  
 * Requirements: MongoDB must be running (see [above](#to-run-mongodb))
 * Command: **mongo pmd** (where “pmd” is the name of the database to be created)
  
 ### To Seed the Local Database:
 * Requirements: MongoDB must be running (see [above](#to-run-mongodb)), database named “pmd” must exist
 * Command: **node app.js** (runs the file “app.js”)
  
 ### Dropping the Database:
 * If anything is wrong with the database (ex. it's been seeded multiple times), then you should drop the database
 * Command: *coming soon*
  
 ## Back End

 ### To Install:
 * Requirements: within directory '/backend', npm [installed](#before-you-do-anything-else)
 * Command: **npm install**
  
 ### To Run:
 * Requirements: Back end install complete, currently within directory '/backend', MongoDB [running](#to-run-mongodb)
 * Command: **node index.js**
   * If running properly, should display “Node app is running on port 500”

## Desktop Front End
 ### To Install Package:
 * Requirements: none, can be within any directory, npm [installed](#before-you-do-anything-else)
 * Command: **npm install @angular/cli**, or download manually through this link
 ### To Install Dependencies:
 * Requirements: Within directory '/DesktopFrontend', npm [installed](#before-you-do-anything-else)
 * Command: **npm install**
 ### To Run:
 * Requirements: Within directory '/DesktopFrontend', above install complete
 * Command: **ng serve**
   * To View: **localhost:4200** in browser

## Mobile Front End

 ### To Install Package:
 * Requirements: none, can be within any directory, npm [installed](#before-you-do-anything-else)
 * Command: **npm install ionic**
 ### To Install Dependencies:
 * Requirements: Within directory '/MobileFrontend', npm [installed](#before-you-do-anything-else)
 * Command: **npm install**
 ### To Run:
 * Requirements: Within directory '/MobileFrontend', above install complete
 * Command: **ionic serve**
   * To View: **localhost:8100** in browser
