const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory mock database
let data = [];

app.use(bodyParser.json());

// GET endpoint to retrieve all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// POST endpoint to add new data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json(newData);
});

// PUT endpoint to update existing data
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (data[id]) {
    data[id] = updatedData;
    res.json(updatedData);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// DELETE endpoint to remove data
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;

  if (data[id]) {
    data.splice(id, 1);
    res.json({ message: 'Data deleted' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
