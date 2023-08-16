const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');
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



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
