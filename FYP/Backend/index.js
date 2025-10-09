const express = require("express");
const cors = require("cors");
const connectDb = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//routes

//db
connectDb().then(() => {
    //listen
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});