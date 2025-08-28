const express = require('express');
const { handleGenerateNewShortUrl, handleFetchAndRedirectUrl, handleAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleFetchAndRedirectUrl);
router.get('/analytics/:shortId', handleAnalytics);

module.exports = router;