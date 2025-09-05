const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { connectToMongoDb } = require('./connection');


app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


connectToMongoDb('mongodb://127.0.0.1:27017/shorturl')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("MongoDB error:", err))

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})