const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');
const fetch = require('node-fetch'); // Add this line
const port = 3000;

// PostgreSQL database configuration
const db = new Client({
    user: 'postgres',
    password: 'your_postgres_password',
    host: 'localhost',
    port: 5431, // Default PostgreSQL port
    database: 'firstDatabase'
});

// Connect to the PostgreSQL database
db.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database:', err);
    });

// Use the cors middleware
app.use(cors());

// Serve static files from the frontend folder (adjusting the path)
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve the index.html file from the frontend folder (adjusting the path)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Endpoint to retrieve all seasons from the PostgreSQL database
app.get('/api/seasons', async (req, res) => {
    try {
        // Retrieve seasons from the PostgreSQL database
        const query = 'SELECT * FROM "Seasons"';
        const result = await db.query(query);
        const seasons = result.rows;
        res.json(seasons);
        console.log(seasons);
    } catch (err) {
        console.error('Error fetching seasons from PostgreSQL:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// New endpoint to fetch players for a specific season from the external API
app.get('/api/seasons/:seasonId/players', async (req, res) => {
    const { seasonId } = req.params;
    const apiKey = 'b3ah5dwxbswnjzguuhu5q5uj'; // Replace with your actual API key
    const apiUrl = `http://api.sportradar.us/darts/trial/v2/en/seasons/${seasonId}/competitors.json?api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const players = data.season_competitors.map(player => ({
            id: player.id,
            name: player.name
        }));
        res.json(players);
        console.log(players)
    } catch (error) {
        console.error('Error fetching players from external API:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
