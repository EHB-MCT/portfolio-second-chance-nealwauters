const { Client } = require('pg');

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

async function insertMockData() {
    const newDbClient = new Client({
        user: 'postgres',
        password: 'your_postgres_password',
        host: 'localhost',
        port: 5431,
        database: 'firstDatabase'
    });

    try {
        await newDbClient.connect();

        for (const season of mockSeasons) {
            const { id, name} = season;

            const query = 'INSERT INTO "Seasons" (id, name) VALUES ($1, $2)';
            await newDbClient.query(query, [id, name]);
            console.log('Mock data inserted into "Seasons" table:', season);
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
        insertMockData();
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database:', err);
    });
