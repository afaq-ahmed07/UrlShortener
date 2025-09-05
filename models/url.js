const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        redirectUrl: {
            type: String,
            required: true,
        },
        visitHistory:
            [{
                timestamps: {
                    type: Number
                }
            }],
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
        }
    },

    { timestamps: true },
)

const Url = mongoose.model('url', urlSchema)
module.exports = Url;