// config/database.js
const oracledb = require('oracledb');
require('dotenv').config();

let pool;

async function initDB() {
  try {
    pool = await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1
    });
    console.log('✅ Oracle DB pool created');
  } catch (err) {
    console.error('❌ Failed to create Oracle DB pool:', err);
    throw err;
  }
}

async function closeDB() {
  try {
    if (pool) {
      await pool.close(0);
      console.log('🔌 Oracle DB pool closed');
    }
  } catch (err) {
    console.error('❌ Error closing DB pool:', err);
  }
}

async function executeQuery(sql, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(sql, params, { autoCommit: true });
    return result;
  } catch (err) {
    console.error('❌ Query Error:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('❌ Error closing connection:', err);
      }
    }
  }
}

module.exports = {
  initDB,
  closeDB,
  executeQuery
};
