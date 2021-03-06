require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require("./db");
const morgan = require('morgan');
const passport = require('./passport');

const app = express();
const port = process.env.PORT || 5000; //port which server runs on

//Middlware
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//Sessions
app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: 'secret', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

app.use(passport.initialize())
app.use(passport.session()) //supose to call to deserialize user

const foodItemsRouter = require('./routes/foodItems');
const userRouter = require('./routes/user');

app.use('/foodItems', foodItemsRouter);
app.use('/user', userRouter);

app.use(function(err, req, res, next){
	console.log('ERROR M8!')
	console.log(err.stack)
	res.status(500)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})