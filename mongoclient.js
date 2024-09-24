const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'productManagementAPI';


 exports.database =  async () => {
    try { 
        let connection = await client.connect();
        let database = await connection.db(dbName);
        return database;
    } catch (error) {
        console.error(error);
     }
}
