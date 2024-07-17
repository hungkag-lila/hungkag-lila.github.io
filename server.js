const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 8080;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect('mongodb+srv://kylenasayao16:KWYWc55od89Txr4v@cluster0.fzaiao7.mongodb.net/level-tracker')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(port);