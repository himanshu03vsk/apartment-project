const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const AppDataSource = new DataSource({
    type: "oracle",
    username: process.env.DB_USER || 'APT_DBA',
    password: process.env.DB_PASSWORD || 'APT_DBA',
    connectString: process.env.DB_CONNECT_STRING || 'localhost:1521/APT_DB',
    serviceName: process.env.DB_SERVICE_NAME || 'APT_DB',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [path.join(__dirname, '../entity/*{.ts,.js}')],
    migrations: [path.join(__dirname, '../migration/*{.ts,.js}')],
    subscribers: [path.join(__dirname, '../subscriber/*{.ts,.js}')],
    // Oracle specific options
    poolSize: 10,
    extra: {
        poolMin: 2,
        poolMax: 10,
        poolIncrement: 1
    }
});

module.exports = AppDataSource; 