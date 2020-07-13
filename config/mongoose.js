const mongoose = require('mongoose');
const Status = require('../models/status');
const db1=mongoose.connect('mongodb://localhost/Hospital_API');


const db = mongoose.connection;


db.on('error', console.error.bind(console,"Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to DB::MongoDB' );
})


module.exports = db;