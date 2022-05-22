const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

//import routers
const userRouter = require('./routes/userRouter.js');

//create app
const app = express();

//add middlewares
app.use(session({
    secret: crypto.randomBytes(20).toString('hex')
}));
//add store

//add routers
app.use('/user', userRouter);

//start application
app.listen(8080, () => {
    console.log("Listening on port 8080");
})