const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

//import routers
const userRouter = require('./routes/userRouter.js');
const documentRouter = require('./routes/documentRouter.js');

//create app
const app = express();
app.use(express.json())

//add middlewares
app.use(session({
    secret: crypto.randomBytes(20).toString('hex')
}));
//add store

//add routers
app.use('/api/user', userRouter);
app.use('/api/document', documentRouter);

//start application
app.listen(8088, () => {
    console.log("Listening on port 8080");
})