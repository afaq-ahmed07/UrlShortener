const { nanoid } = require("nanoid");
const Url = require('../models/url');


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    const allUrls=await Url.find({});
    if (!body.url) return res.status(400).json({ error: 'Url is Required' })
    const shortId = nanoid(8);
    await Url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    });
    return res.render('home',{
        shortId:shortId,
        urls:allUrls,
    });
    // return res.status(200).json({ id: shortId });
}

async function handleFetchAndRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const url = await Url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            }
        }
    })
    if (!url) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(url.redirectUrl);
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    if (!result) {
        return res.json({ error: "Url not Found" });
    }
    res.json({ totalClicks: result.visitHistory.length, analytics: visitHistory });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleFetchAndRedirectUrl,
    handleAnalytics,
};