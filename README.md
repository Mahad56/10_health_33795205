Health Tracker Web Application

This project is a fitness activity tracking system built for the Dynamic Web Applications module. It demonstrates a complete example of a data-driven web application using Node.js, Express, EJS, and MySQL. Users can create an account, log in securely, and manage their personal fitness activities. The system includes full CRUD functionality, search features, route protection, server-side validation, and an error-handling layer.

Core Features

User authentication is handled through registration and login pages, with passwords hashed using bcrypt and sessions managed by express-session. A custom middleware file controls access to any page that requires the user to be logged in.

The activity management features let users add new activities, view a personalised list, edit entries, and delete them. All form submissions go through validation to prevent incomplete or faulty data. Date formatting is handled through MySQL using DATE_FORMAT.

A search page allows users to look up activities by name, with SQL queries restricted to the logged-in user to protect private data. All queries enforce ownership rules so one user cannot view or modify another user’s activity records.

The project is fully deployable and includes SQL scripts to set up the database and insert test data. It runs on localhost or on the Goldsmiths VM using port 8000.

Installation and Setup

Clone the repository
git clone <your-repository-url>
cd 10_health_33795205

Install dependencies
npm install

Create an environment file (.env) in the project root
HEALTH_HOST=localhost
HEALTH_USER=health_app
HEALTH_PASSWORD=qwertyuiop
HEALTH_DATABASE=health

Build the database by opening MySQL and running
SOURCE create_db.sql;
SOURCE insert_test_data.sql;

These commands create the tables, insert test records, and add the required login user.

Running the Application

Start the server with:
node index.js

The application will be available at:
http://localhost:8000

Default Login for Marking

Username: gold
Password: smiths

This user is inserted automatically by the insert_test_data.sql script.

Project Structure

index.js – main application file
routes/auth.js – registration, login, logout
routes/activities.js – activity CRUD and search
routes/search.js – search functionality
middleware/auth.js – login protection
middleware/validate.js – form validation
middleware/error.js – central error handler
views/ – EJS templates
public/ – CSS and static files
create_db.sql – creates the database schema
insert_test_data.sql – inserts sample data and login user