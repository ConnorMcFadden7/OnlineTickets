<<<<<<< HEAD
# Getting started

## Installing Node.js

Download and install Node.js http://nodejs.org/

## Clone repository

Clone the repository locally and cd into the directory

```
git clone git@github.com:thinkproductivity/tickets.git
cd tickets
```

## Install NPM dependencies

```
npm install
```

# Running the code

The entry point to the server application is the app.js file. You can run this with the following command

```
./node_modules/nodemon/bin/nodemon.js app.js
```

Once running open your browser and head to `https://localhost:3000`. You should see the homepage for the ticket system.

# Updating code

Changes made to the code should be automatically rebuilt by the nodemon command run above, just refresh your browser to see the changes.

# Tasks

The application is split into 2 main parts. The client part where the user can create a support ticket, and the admin part where
the staff can see all open tickets and reply to them.

## Client Part

![](https://s3.amazonaws.com/uploads.hipchat.com/18287/84730/y3wUVE8kbYjggg5/Screen%20Shot%202014-07-24%20at%2012.06.27.png)

![](https://s3.amazonaws.com/uploads.hipchat.com/18287/84730/7nKNtwy7LMCOA59/Screen%20Shot%202014-07-24%20at%2012.06.32.png)

1. The user should be able to fill in the following fields. Name, email, subject and message. All fields are required
2. When the user presses the Send button, the server should validate all fields and display an error if any of the fields are missing
3. If all fields are present, the ticket should be stored in a MongoDB collection called tickets.
4. The user should then be shown the thankyou page by redirecting to `/thankyou`.

## Admin Part

![](https://s3.amazonaws.com/uploads.hipchat.com/18287/84730/CUS5CTzWmdxNEF5/Screen%20Shot%202014-07-24%20at%2012.07.06.png)

![](https://s3.amazonaws.com/uploads.hipchat.com/18287/84730/Y03hq5vi0bciDG0/Screen%20Shot%202014-07-24%20at%2012.07.10.png)

1. The admin part of the site can be accessed by going to http://localhost:3000/admin
2. Add Basic HTTP Authenication to the /admin routes so the user is required to input a user name and password.
3. The Open tickets page should get all tickets from the MongoDB collection that have a status of 'open'. The tickets should be ordered by oldest first.
4. Clicking the Reply button on a ticket row should show a page with the ticket details.
5. From here you should be able to reply to the ticket. The reply message should be stored on the ticket document in the DB, and the ticket status should be updated to 'closed'.
6. The user should then be redirected back to the list of Open Tickets.

# Additional Information

* You can create a free MongoDB by signing up at https://www.mongohq.com/. Alternatively you can install MongoDB locally to your machine.
* You should use the mongodb node.js library to connect to the MongoDB database. An introduction to how to use this library can be found at  http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
=======
OnlineTickets
=============

Backend tool to reply to user's tickets. Built in Node.JS and MongoDB.
>>>>>>> d02ddba15fb06a847f8cb2cc5b4550bc8abc1e81
