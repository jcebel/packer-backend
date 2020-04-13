# packer-backend
This is the Backend Application of Packer.

This was part of a student's project at Technical University of Munich

## Production environment
Currently the packer-backend is also deployed on AWS. 
For more information please contact [alex](mailto:alexandros.tsakpinis@googlemail.com).

### Local Production-like testing

Go to your project root folder via command line:
```
cd path/to/workspace/packer-backend
```

Install node dependencies:

```
npm install
```

Start the database server:
```
mongod --dbpath relative/path/to/database
```

You may alter the Mongo Location. These variables are set as your environment variables.
```bash
export PORT=3000
export MONGODB_URI="mongodb://localhost:27017/packerdb"
export JWT_SECRET="very secret secret"
```

Start the backend server
```bash
npm start
```

#### Route Building Process

This triggers the route building based on the existing DeliveryGoods of today with a delivery Date of today.
You may add optionally a specific date to the call. This creates routes with all Delivery Goods for the specified Date.

```bash
npm run routing [<date in format YYYY-MM-DD>]
```

#### Auction Finish Process

This triggers the finishing of the current running auction. 
It sets the deliveryState of each DeliveryGood of 
today's routes to "Waiting for Pickup" and the auctionOver variable of each route of today to "true".
This method should be executed after the route builder.

You may add optionally add a specific date to the call. **This is more for dev-tests** 
```bash
npm run finish [<date in format YYYY-MM-DD>]
```

## Development environment start of the project

**Development environment**
```bash
npm run devstart
```

**Testing environment**
```bash
npm test
```
This will allow you to execute the scripts contained in src-test/model/testData.js. 
Those tests are currently set up to fill the database with test data during development.

**It is not necessary nor recommended to use these scripts for testing in a production-like environment.**
The scripts are only for development purposes. You may fill the database by your own interactions with the application.
