const express = require('express');
const { connectToMongoDB, fetchCollectionData } = require('./db');

const app = express();
const port = 3000; // or any desired port number
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// Connect to MongoDB
connectToMongoDB();

// API route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchCollectionData('demo'); // replace 'mycollection' with your actual collection name
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
