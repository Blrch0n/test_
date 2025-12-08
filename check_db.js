const db = require('./db');

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...\n');
    
    // Check connection
    await db.query('SELECT 1');
    console.log('✅ Database connection successful!\n');
    
    // Show tables
    const [tables] = await db.query('SHOW TABLES');
    console.log('📋 Tables in database:');
    if (tables.length === 0) {
      console.log('   ⚠️  NO TABLES FOUND! You need to run database/setup.sql');
    } else {
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`   ✓ ${tableName}`);
      });
    }
    console.log('');
    
    // Check if required tables exist
    const requiredTables = ['users', 'events', 'registrations'];
    for (const tableName of requiredTables) {
      try {
        const [rows] = await db.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        console.log(`📊 Table '${tableName}': ${rows[0].count} rows`);
      } catch (err) {
        console.log(`❌ Table '${tableName}': NOT FOUND`);
      }
    }
    
  } catch (error) {
    console.error('❌ Database Error:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n⚠️  Database does not exist! You need to:');
      console.log('   1. Connect to MySQL using HeidiSQL or mysql command');
      console.log('   2. Run the database/setup.sql file');
    }
  } finally {
    process.exit();
  }
}

checkDatabase();
