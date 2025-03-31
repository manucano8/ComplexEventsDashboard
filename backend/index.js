require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');

// Initialize the Express application
const app = express(); 

app.use(express.json());
app.use(cors());

//Connects the application to our server in MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use('/events', eventsRouter);
app.use('/users', usersRouter);

console.log("Starting server...");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});