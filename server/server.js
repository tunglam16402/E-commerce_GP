const express = require('express');
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParse = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;

// đọc dữ liệu theo kiểu json hoặc urlencode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// đọc dữ liệu trên cookie
app.use(cookieParse());

//liên kết db
dbConnect();
// liên kết api vào app
initRoutes(app);

app.use('/', (req, res) => {
    res.send('SERVER ON');
});

// web server
app.listen(port, () => {
    console.log('Server running on the port: ' + port);
});