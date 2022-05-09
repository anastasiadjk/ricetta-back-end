## Introduction

This project is the backend of Ricetta, an app that allows you to create, store, update and delete your recipes. 

This is the implementation of Ricetta in Node.js.

## Setup

Make sure to follow all these steps below. Do not miss any steps or you won't be able to run this application.

### Download the front-end of Ricetta from ricetta-react repository.

From the project folder, install the dependencies:

    npm i
    
Next to start the app run:

  npm start

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the ricetta-backend project folder, install the dependencies:

    npm i
    

### Start the Server

    node index.js

This will launch the Node server on port 3900. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:3900/api/genres

You should see the list of genres. That confirms that you have set up everything successfully.
