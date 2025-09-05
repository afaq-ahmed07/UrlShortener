const express = require('express');
const Url = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin/urls',restrictTo(["ADMIN"]),async (req, res) => {
    try {
        const allUrls = await Url.find({});
        res.render('home', {
            urls: allUrls,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching URLs");
    }
});

router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req, res) => {
    try {
        const allUrls = await Url.find({createdBy: req.user.id});
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