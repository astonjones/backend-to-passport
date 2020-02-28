const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; //port which server runs on

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; //uri to connect to mongoose cluster found in dotenv file
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); //connects to cluster
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection etablished successfully!")
})

//checks if connection with the database is successful
connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

const foodItemsRouter = require('./routes/foodItems');
const usersRouter = require('./routes/users');

app.use('/foodItems', foodItemsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})