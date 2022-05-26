# house-management-app-frontend

## Requirements

 - Node.js
	-   `14.0.0`  or higher
	- https://nodejs.org/en/
- NPM (installed with Node.js above) 
	-  `5.6`  or higher
- Our Django Backend up and running locally:
	- https://github.com/ccsf-house-management-app/house-management-app

## Instructions to run React Front-End
After git cloning this repository you will need to install the dependencies using npm.

 - In a terminal, cd into the directory `house_app` containing the   
   `package.json` file.
 - Run `npm install` and wait for the installation to complete.

After npm finishes installing the dependencies, make sure the Django backend is up and running and then start the app with npm:

`npm start`

## Using the App with local development server

Currently the "Sign Up" feature isn't connected to the back-end, so to sign in you will need to do one of the following:

 - Request existing login credentials from one of the app maintainers.
 - Create a new username and password using the Django back-end app at http://127.0.0.1:8000/users/signup/

Once signed in, you should be redirected to the **Records** page which is the only page currently designed and working in the front-end.

Under the list of **Rooms** you can add a new Room Entry using the "Create New Room" button.  

*note: The Room ID has to be entered manually as a simple string. *

This is the only CRUD function currently available on the front-end.  

To explore the rest of the back-end's CRUD functionality and tables provided by the database, explore the Django App as a user or with the API endpoints:

 - http://127.0.0.1:8000/
 - http://127.0.0.1:8000/api/
