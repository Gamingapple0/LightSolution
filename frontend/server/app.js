const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Establish the MongoDB Atlas connection using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://Anshu:SIT314@sit314.efvzdco.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

// Connect to the "lightnodes" collection using the MongoDB driver
async function connectToLightNodesCollection() {
  const uri = "mongodb+srv://Anshu:SIT314@sit314.efvzdco.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const database = client.db("sit314");
    const collection = database.collection("lightnodes_data");

    // Example: Find documents with a specific filter (replace with your filter)
    const query = { _id: "nodes" };
    const foundDocuments = await collection.find(query).toArray();
    console.log("Found documents:", foundDocuments);

    return foundDocuments; // Return the found documents

  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

// Call the function to connect to MongoDB Atlas
connectToMongoDB();

// Define a route to handle GET requests and send the found documents
app.get('/', async (req, res) => {
  try {
    const foundDocuments = await connectToLightNodesCollection();
    res.json(foundDocuments);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a Mongoose schema for your data
const dataSchema = new mongoose.Schema({
    i:String,
    color: String,
    brightness: Number,
    isChecked: Boolean,
    latestAction: String,
  });
  
  // Create a Mongoose model for your data
  mongoose.model('Data', dataSchema);


// Define a route to handle POST requests and save data
// Define a route to handle POST requests and save data
app.post('/api/save', async (req, res) => {
    try {
      // Assuming you have a Mongoose model for your data
      const DataModel = mongoose.model('Data');
  
      // Create a new document using the request body
      const newData = new DataModel(req.body);
  
      const uri = "mongodb+srv://Anshu:SIT314@sit314.efvzdco.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      // Save the new data document to MongoDB
      console.log("``````````````````````````````")
      // console.log(newData);

      
  
      // Assuming you have an _id field in your newData object
      const query = { _id: 'nodes' }; // Use the _id field for the update query
      const updateData = {
        $set: {
          [newData.i]:{
            brightness: newData.brightness,
            color: newData.color,
            personDetected: newData.isChecked,
            latestAction: newData.latestAction,
          }
        },
      };
  
      console.log(updateData)
      const database = client.db("sit314");
      const collection = database.collection("lightnodes_data");
  
      // Use updateOne with $set operator to update the document
      await collection.findOneAndUpdate(query, updateData);
  
    //   const foundDocuments = await connectToLightNodesCollection();
  
      // Send a success response
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error("Error handling POST request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
