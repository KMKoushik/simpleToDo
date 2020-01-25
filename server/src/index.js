const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const router = require('./router');

const url = 'mongodb://localhost:27017/test';
const app = express();
const port = 5000;

const connectDB = () => new Promise((res, rej) => {
  mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', () => rej('Error while connecting to DB'));
  db.once('open', function () {
    res(true);
  });

});

const connectServer = () => new Promise((res) => {
  app.listen(port, () => res(true));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next();
});

app.use(express.json());

app.get('/', (req, res) => res.send('Hello world'));

app.use('/todo', router);

console.log('Starting Application');

connectDB().
  then(connectServer)
  .then(() => console.log('Connected to server'))
  .catch(console.log);

