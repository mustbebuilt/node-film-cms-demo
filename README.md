# html-assets

Delete from All Collection

db.collection.remove({})

## MongoDb Compass

Set up requires a local copy of MongoDb. Best achieved with MongoDb Compass.

https://www.mongodb.com/products/compass

## Community Server

https://www.mongodb.com/docs/manual/administration/install-community/

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x-tarball/

Extracted into Downloads and then cp to usr

sudo cp /path/to/the/mongodb-directory/bin/\* /usr/local/bin/

ie
sudo cp /Users/martincooper/Downloads/mongodb-macos-x86_64-5.0.9/bin/\* /usr/local/bin/
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/mongodb

sudo mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log

## Run Mongo

STEP ONE:
mongod

STEP TWO:
mongo

STEP THREE:
(Terminal)
mongoimport --db filmsDb --collection filmsCollection --jsonArray --file movies.json

STEP FOUR:
use filmsDb
show filmsCollection
db.filmsCollection.find()

In node

STEP ONE:
Get client
npm install mongodb --save
