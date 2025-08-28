const express = require('express');
const Url = require('../models/url');

const router = express.Router();


router.get('/', async (req, res) => {
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

module.exports = router;