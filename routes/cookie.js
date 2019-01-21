const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.cookie('name', 'Cookie').send('Set cookie');
    console.log('Cookies: ', req.cookies);
});
module.exports = router;