const { Client } = require('pg');
const fetch = require('node-fetch');

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
        fetchDataAndInsertIntoDatabase(); // Call the function to fetch data and insert into the database
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database:', err);
    });



async function fetchDataAndInsertIntoDatabase() {
  const apiUrl = "http://api.sportradar.us/darts/trial/v2/en/seasons.json?api_key=b3ah5dwxbswnjzguuhu5q5uj";

  try {
      const response = await fetch(apiUrl);
      const apiData = await response.json();
      const seasons = apiData.seasons;

      // Assuming seasons is an array of season objects
      for (const season of seasons) {
          const { id, name, start_date, end_date } = season;
          console.log(season);

          // Insert data into "Seasons" table
          /*const query = 'INSERT INTO "Seasons" (id, name, start_date, end_date) VALUES ($1, $2, $3, $4)';
          await db.query(query, [id, name, start_date, end_date])
          console.log('Data inserted into "Seasons" table');
          */
          
      }
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the database connection
      db.end();
  }
}

// Call the function to fetch data and insert into the database
fetchDataAndInsertIntoDatabase();
