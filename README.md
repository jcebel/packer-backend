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
* Create all database schemes and import data to begin with
```
mongorestore dump/
```

**Set the environment variables**

This variables are based in your local configuration
```bash
export PORT=3000
export MONGODB_URI="mongodb://localhost:27017/moviedb"
export JWT_SECRET="very secret secret"
```
