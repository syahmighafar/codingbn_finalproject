const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const passport = require('passport');
const session = require('express-session');

const connectDB = require('./server/database/connection');


const app = express();

dotenv.config({ path: 'config.env'})
const PORT = process.env.PORT||8080

//log request
app.use(morgan('tiny'))

// passport config
require('./server/passport')(passport)

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view enginer

app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./server/routes/router'))
app.use('/auth', require('./server/routes/auth'))


app.listen(3000,()=> {console.log(`Server is running on http://localhost:${PORT}`)});