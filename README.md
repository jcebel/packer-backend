# packer-backend
This is the Backend Application of Packer.

## Setup (before first run)

Go to your project root folder via command line
```
cd path/to/workspace/packer-backend
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* Start the database server
```
mongod --dbpath relative/path/to/database
```

**Set the environment variables**

This variables are based in your local configuration
```bash
export PORT=3000
export MONGODB_URI="mongodb://localhost:27017/moviedb"
export JWT_SECRET="very secret secret"
```

## Start the project

**Development environment**
```bash
npm run devstart
```

**Testing environment**
```bash
npm test
```
This will allow you to execute the scripts contained in src-test/model/testData.js. 
Those tests are currently set up to fill the database step by step.
You may change the scripts to your own needs. 

**Production environment**
```bash
npm start
```

**Route Building Process**

This triggers the route building based on the existing DeliveryGoods of today with a delivery Date of today.
You may add optionally a specific date for the call. This creates a route with all Delivery Goods for the specified Date.

```bash
npm run routing [<date in format YYYY-MM-DD>]
```

**Hint:** The current mock data contains valid items for the specific date `2019-10-17T22:00:00.000+00:00`.