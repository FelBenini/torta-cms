# 🥧 tortaCMS

![Alt text](https://i.imgur.com/u6DxJPJ.png)

A headless content management system made with Next.JS

## 🚀 Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Node.js installed on your system and a MongoDB database.

### Installing

- First clone this repository

```bash 
git clone https://github.com/FelBenini/torta-cms.git
```

- And install its dependencies

```bash
npm install
```

- Rename '.env.local.example' to '.env.local' and change its values, it should look something like this:

```makefile
CONNECTION_STRING='mongodb://localhost:27017/tortaCMS' #mongoDB connection string
NEXTAUTH_SECRET='asdfasdfdasfa0j324asdioahdAAsdfasfsaddfasofjadspo243432zafaASdgsfHDShgSGSFHgs' #this is the hash that will encrypt your jwt tokens
NEXTAUTH_URL='http://localhost:3000'
```

- Finally build and run the project

```bash
npm run build
```
```bash
npm start
```
Open your favorite browser and navigate to http://localhost:3000 to see tortaCMS running!

## 🛰 Deploying

You can easily deploy tortaCMS on Vercel with MongoDB Atlas for free.

- First fork this repository.
- Create a database on https://www.mongodb.com/atlas/database and whitelist the access for your database using '0.0.0.0'. To ensure that your database is secure, use a random generated password.
- Then go to https://vercel.com/dashboard and add a new project choosing the tortaCMS repository that you created as your template.
- After that create all the environment variables on your vercel project, just like the ones in the '.env.local.example'. Your environment variables should end up looking like the image below.

![Alt text](https://i.imgur.com/qNbFQEJ.png)

Success! Now you have tortaCMS hosted and running on the cloud! You are good to go to start your new project using tortaCMS!