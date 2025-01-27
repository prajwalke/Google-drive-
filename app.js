const express = require('express');
const path = require('path');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const connecToDB = require('./config/db');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');
dotenv.config();
connecToDB();

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(cookieParser());
// Serve static files from the "public" directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter)

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Route to render the register form
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

/*  /user/test */
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});