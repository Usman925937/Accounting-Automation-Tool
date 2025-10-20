const express = require("express");
const cors = require("cors");
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');;

const accountRoutes = require("./routes/accountRoutes");
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const financialYearRoutes = require("./routes/financialYearRoutes");
const journalEntryRoutes = require("./routes/journalEntryRoutes");

const authMiddleware = require('./middleware/authMiddleware');
const isApprovedMiddleware = require('./middleware/isApprovedMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/companies/:companyId/accounts", authMiddleware, isApprovedMiddleware, accountRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/financial-years", financialYearRoutes);
app.use("/api/journal-entries", journalEntryRoutes);

//db
connectDb().then(() => {
    //listen
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});