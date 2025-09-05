const express = require('express');
const Url = require('../models/url');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        if(!req.user) return res.redirect('/signup');
        const allUrls = await Url.find({createdBy: req.user._id});
        res.render('home', {
            urls: allUrls,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching URLs");
    }
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports = router;