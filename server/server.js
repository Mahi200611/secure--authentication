const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();



const connectDB = require("./config/db");
connectDB();



const app = express();

app.use(cors({
    origin:
    "http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});