# Hospital-API
An backend API for doctors to manage their day to day work using NODE.js.

# Description 
An API for the doctors of a Hospital which has been
allocated by the govt for testing and quarantine + well being of COVID-19
patients.
Doctors can log in and each time a patient visits, the doctor will follow 2 steps
  - Register the patient in the app (using phone number, if the patient
    already exists, returns the patient info in the API)
  - After the checkup, create a Report
  - Patient Report will have the following fields:
      - Created by doctor
      - Status[Negative, Travelled-Quarantine,
        Symptoms-Quarantine, Positive-Admit]
      - Date

# Routes Present
- /doctors/register 
   → Register doctors with their username and password
- /doctors/login 
   → Matches the username and password and return the JWT
- /patients/register
   → Register a patient using their phone number.
- /patients/:id/create_report
   → Creates a report for the patient based on status selected, returns the report created
- /patients/:id/all_reports 
   → List all the reports of a patient based on the patient id in the url, listing them oldest to latest.
- /reports/:status 
   → List all the reports of all the patients filtered by a specific status.

# Unit Tests 
1. Unit Tests for route: `/patients/register`
   - 
2. Unit Tests for route: `/patients/:id/create_report`
   1. it should not create a report if pateint id in url is not registered
   2. it should not create a report if status code is missing
   3. it should not create a report if status code is invalid
   4. it should create a report successfully if status is valid and patient id is registered 
3. Unit Tests for route: `/patients/:id/all_reports`


## Setting up the project
1. Clone at your local system.
2. Open the folder in visual studio code.
3. Open terminal and make the project folder as your current directory
4. Install all the dependencies as mentioned in the package.json :
```
npm install
```
5. Configure your secret encryption key used in passport-jwt-strategy.

6. input the command `npm start` on terminal

7. Use your browser or Postman to interact with the API
