import {Client} from 'pg'

const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "postgres",
	port: '5432',
	database: 'social_network',
});

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});
