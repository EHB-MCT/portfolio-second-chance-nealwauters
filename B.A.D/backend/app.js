const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3000;

// Mock database of Premier League teams
const mockDatabase = [
    { id: 1, name: 'MVG', city: '96' },
    { id: 2, name: 'GP ', city: '101' },
    { id: 3, name: 'DVB', city: '91' },
    // ... add more teams here ...
];
// Use the cors middleware
app.use(cors());


// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} request to ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to Premier League API');
});

app.get('/api/teams', (req, res) => {
    res.json(mockDatabase);
});

app.get('/api/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const team = mockDatabase.find(team => team.id === teamId);
    
    if (team) {
        res.json(team);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
