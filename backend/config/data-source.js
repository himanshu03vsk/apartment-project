const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'oracle',
  host: 'localhost',
  port: 1521,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.SERVICE_NAME || 'APT_DB',
  synchronize: false,
  logging: true,
  entitySkipConstructor: true,
  formatOptions: {
    castParameters: false,
    enableQualifiedNames: false
  },
  entities: [
    require('../entity/Amenity'),
    require('../entity/User')
  ],
});

module.exports = { AppDataSource };
