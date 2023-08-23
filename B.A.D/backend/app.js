const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Don't forget to include path
const db = require('./db'); // Assuming db.js is in the same directory

const app = express();

app.use(bodyParser.json());
app.use(express.static('frontend'));


// Serve the index.html file from the frontend folder (adjusting the path)
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
  } catch (error) {
    console.error('Error fetching :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/players', async (req, res) => {
  try {
    // Retrieve seasons from the PostgreSQL database
    const query = 'SELECT * FROM "dartplayers"';
    const result = await db.query(query);
    const players = result.rows;

    res.json(players);
    console.log(players);

  }
  catch (err) {
    console.error('Error fetching seasons from PostgreSQL:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/players/stats/:playerId', async (req, res) => {
  try {
    const playerId = req.params.playerId;

    const getPlayerQuery = 'SELECT * FROM "dartplayers" WHERE id = $1'; // Use lowercase column name
    const playerResult = await db.query(getPlayerQuery, [playerId]);
    const player = playerResult.rows[0];

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player);
  } catch (err) {
    console.error('Error fetching player stats from PostgreSQL:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/submit-stats', async (req, res) => {
  try {
    const { name, checkoutPercentage, checkouts, scores180s } = req.body;

    // Perform validation on the submitted data if needed

    // Insert the submitted data into the database
    const insertQuery = `
      INSERT INTO "dartplayers" (name, checkoutPercentage, checkouts, scores180s)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const result = await db.query(insertQuery, [name, checkoutPercentage, checkouts, scores180s]);

    const insertedId = result.rows[0].id;

    res.json({ message: 'Stats submitted successfully', insertedId });
  } catch (error) {
    console.error('Error submitting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/create-tables', async (req, res) => {

  try {
    // Create "PlayerStats" table
    await db.query(`
      CREATE TABLE IF NOT EXISTS PlayerStats (
        id SERIAL PRIMARY KEY,
        player_id INTEGER REFERENCES Players(id),
        date DATE NOT NULL,
        score INTEGER NOT NULL 
      )
    `);

    res.json({ message: 'Tables created successfully' });
  } catch (error) {
    console.error('Error creating tables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
