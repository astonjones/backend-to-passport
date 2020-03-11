require('dotenv').config();
//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = process.env.ATLAS_URI; //uri to connect to mongoose cluster found in dotenv file 

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


  //mongoose connection

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); //connects to cluster
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection etablished successfully!")
// });

// //checks if connection with the database is successful
// connection.on('error', console.error.bind(console, 'MongoDB connection error: '));


module.exports = mongoose.connection