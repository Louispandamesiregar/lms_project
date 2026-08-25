const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    const result = await sql`SELECT 1 as result`;
    console.log('Connection successful:', result);
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

testConnection();
