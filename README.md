# Gothic City Police Department Villain Reporting Tool

There are 2 parts to this application--the server and the client--both are written in javascript (React.js is used on the client, and Node.js + Express is used on the server).

## Setup

Make sure you have node and npm installed on your machine, then run `npm install` in the main directory.

## To run

Run `npm run server` and then `npm run client` in the main directory.

The client web app will be running at http://localhost:3000.
The server runs on port 3001.

I have provided some test images to use in the `test_images/` directory.

## Info

If given more time, here are some things I would consider:
  - Improving error handling on the client and providing the client with more information about the errors.
  - Use a database to allow users to keep track of the status of their reports. Currently, a user is able to review the results of their image only after submitting it. With the addition of a database, once a report is submitted, the user would be given a unique ID to enable them to look it up at a later time. If Gothic City were to capture this villain, the status on the report could be updated by GCPD.
  - A drag and drop file uploader would be a bit more convenient on desktop.
  - A homepage that shows a list of the recently recaptured villains.