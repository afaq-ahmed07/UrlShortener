const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const { connectToMongoDb } = require('./connection');
app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectToMongoDb('mongodb://127.0.0.1:27017/shorturl')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("MongoDB error:", err))

app.use('/url', urlRoute);
app.use('/',staticRoute);
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})