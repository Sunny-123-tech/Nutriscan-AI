const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { MongoClient } = require('mongodb');

async function checkDatabaseConnection() {
    const uri = process.env.MONGO_URI;
    console.log('🔍 Testing Database Connection...');
    console.log('URI configured:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'None');

    if (!uri) {
        console.log('\n❌ No MONGO_URI found in .env.');
        console.log('   The app will use its built-in resilient local memory store.\n');
        return;
    }

    try {
        console.log('⏳ Connecting to MongoDB Atlas cluster (timeout 5s)...');
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
        await client.connect();
        const db = client.db();
        await db.command({ ping: 1 });
        console.log(`\n✅ SUCCESS! MongoDB Atlas is connected!`);
        console.log(`   Database Name: ${db.databaseName}`);
        
        const collections = await db.listCollections().toArray();
        console.log(`   Collections found (${collections.length}):`, collections.map(c => c.name).join(', ') || 'None yet (will be created automatically on first run)');
        await client.close();
    } catch (err) {
        console.log(`\n⚠️  Could not connect to MongoDB Atlas.`);
        console.log(`   Error: ${err.message}`);
        console.log(`\nCommon reasons:`);
        console.log(`   1. Network Access: IP address not whitelisted in Atlas (add 0.0.0.0/0 in Network Access).`);
        console.log(`   2. Invalid username or password in MONGO_URI.`);
        console.log(`   3. Cluster is paused or deleted.`);
        console.log(`\n💡 Note: NutriScan AI automatically falls back to its local memory store so the website and ADBMS Studio still work!`);
    }
}

checkDatabaseConnection();
