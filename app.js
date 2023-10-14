const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get("/", (req, res) =>{
    res.send("Welcome to Marketplace Online Application")
})

// Define your API routes
app.use('/api', productRoutes);
// Add more route paths as needed for other API resources


// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:Demimoore25@cluster0.7trxbjo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});