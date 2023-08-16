const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg'); // Import PostgreSQL module
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

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} request to ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to Premier League API');
});

// Endpoint to retrieve all players from the PostgreSQL database
app.get('/api/players', async (req, res) => {
    try {
        // Retrieve players from the PostgreSQL database
        const query = 'SELECT * FROM "Players"'; // Use double quotes for case-sensitive table name
        const result = await db.query(query);
        const players = result.rows; // Extract players from the query result
        res.json(players);
    } catch (err) {
        console.error('Error fetching players from PostgreSQL:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to retrieve a specific player by ID from the PostgreSQL database
app.get('/api/players/:id', async (req, res) => {
    const playerId = parseInt(req.params.id);
    try {
        // Retrieve player by ID from the PostgreSQL database
        const query = 'SELECT * FROM "Players" WHERE id = $1'; // Use double quotes for case-sensitive table name
        const result = await db.query(query, [playerId]);

        if (result.rows.length === 1) {
            const player = result.rows[0]; // Extract the player from the query result
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
        console.error('Error fetching player from PostgreSQL:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
