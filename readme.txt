Run Mongo

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