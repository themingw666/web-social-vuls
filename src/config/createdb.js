import cl from 'pg'

const client = new cl.Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'social_network',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error('Error connect', err);
  });

const text = 'CREATE DATABASE social_network';
await client.query(text);
console.log('Created Database!!'); 
client.end();