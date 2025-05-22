const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { AppDataSource } = require('./config/data-source');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// DB Initialization
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Oracle connected via TypeORM');

    // Routes
    app.use('/api/users', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Oracle DB connection failed:', err);
  });
