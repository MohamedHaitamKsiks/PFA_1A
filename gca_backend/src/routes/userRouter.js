const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    if(req.session.counter){
        req.session.counter++;
    }else{
        req.session.counter = 1;
    }
    res.send('Hello Login ' + req.session.counter);
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('logged out');
});

module.exports = router;