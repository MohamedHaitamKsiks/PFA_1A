const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

//import routers
const userRouter = require('./routes/userRouter.js');
const dossierRouter = require('./routes/dossierRouter.js');
const societeRouter = require('./routes/societeRouter.js');
const particulierRouter = require('./routes/particulierRouter.js');
const documentRouter = require('./routes/documentRouter.js');
const fs = require('fs');

//clear tmp
fs.rmSync('private/tmp', { recursive: true, force: true });
fs.mkdirSync('private/tmp');

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
app.use('/api/dossier', dossierRouter);
app.use('/api/societe', societeRouter);
app.use('/api/particulier', particulierRouter);
app.use('/api/document', documentRouter);

//start application
app.listen(8088, () => {
    console.log("Listening on port 8080");
})