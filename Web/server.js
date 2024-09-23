const bodyParser = require('body-parser');



const express = require('express');
const cors = require('cors');  // Import the cors package

const app = express();
const ecgData = [];

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
// Middleware to parse incoming JSON payloads
app.use(bodyParser.json());

// Endpoint to receive ECG data as JSON
app.post('/data', (req, res) => {
  const { value } = req.body;  // Destructure the value from the request body
  if (value !== undefined) {
    ecgData.push(value);  // Store as an object with 'ecgValue'
    res.status(200).json({ message: 'ECG data received successfully', data : ecgData});
  } else {
    res.status(400).json({ error: 'No ECG value provided' });
  }
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to send ECG data to the frontend
app.get('/ecg', (req, res) => {
  console.log(ecgData)
  res.json({data : ecgData});  // Send the ECG data as a JSON response
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
