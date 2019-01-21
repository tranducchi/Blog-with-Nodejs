const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
var session = require('express-session')
router.get('/register', (req, res)=>{
    res.render('register');
});
router.post('/register', (req, res)=>{
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err)=>{
        if(err) 
            console.log(err);
        return res.redirect('/');
    });
});
router.get('/login', (req, res)=>{
    res.render('login');
});
router.post('/login', (req, res)=>{
    var user = req.body.email;
    var pass = req.body.pass;
    User.find({email:user,password:pass}, (err, data)=>{
        console.log(data);
        if(err) throw err;
        res.redirect('/');
    });
});
module.exports = router;