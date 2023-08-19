const { Client } = require('pg');
const fetch = require('node-fetch');

const db = new Client({
    user: 'postgres',
    password: 'your_postgres_password',
    host: 'localhost',
    port: 5431,
    database: 'firstDatabase'
});

const mockSeasons = [
    {
        id: 'sr:season:1',
        name: 'Mock Season 1',
    },
    {
        id: 'sr:season:2',
        name: 'Mock Season 2',
    },
];

async function insertDataFromApi() {
    const newDbClient = new Client({
        user: 'postgres',
        password: 'your_postgres_password',
        host: 'localhost',
        port: 5431,
        database: 'firstDatabase'
    });

    try {
        await newDbClient.connect();

        // Fetch data from the external API
        const apiUrl = "http://api.sportradar.us/darts/trial/v2/en/seasons.json?api_key=b3ah5dwxbswnjzguuhu5q5uj";
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        const externalApiSeasons = apiData.seasons;

        // Insert data from the external API (id and name only)
        for (const season of externalApiSeasons) {
            const { id, name } = season;
            const query = 'INSERT INTO "Seasons" (id, name) VALUES ($1, $2)';
            await newDbClient.query(query, [id, name]);
            console.log('External API data inserted into "Seasons" table:', { id, name });
        }

        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await newDbClient.end();
    }
}

db.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        insertDataFromApi();
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database:', err);
    });
