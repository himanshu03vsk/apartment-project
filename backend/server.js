// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const { AppDataSource } = require('./config/data-source');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // DB Initialization
// AppDataSource.initialize()
//   .then(() => {
//     console.log('✅ Oracle connected via TypeORM');

//     // Routes
//     app.use('/api/users', userRoutes);

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running at http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error('❌ Oracle DB connection failed:', err);
//   });





// server.js (GraphQL version)
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const { AppDataSource } = require('./config/data-source');
// You'll create these files:
const typeDefs = require('./graphql/schemas/index');         // <--- New: GraphQL Schema
const resolvers = require('./graphql/resolvers/index');     // <--- New: GraphQL Resolvers
// const userRoutes = require('./routes/userRoutes'); // <--- This would be largely replaced by resolvers

async function startServer() {
  const app = express();
  
  try {
    // Initialize DB
    await AppDataSource.initialize();
    console.log('✅ Oracle connected via TypeORM');

    // Create Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // Optional: Add formatError to customize error responses
      formatError: (error) => {
        console.error(error);
        return error;
      },
    });

    // Start the Apollo Server
    await server.start();

    // Apply middleware
    app.use(
      '/graphql',
      cors(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          // Add any context you want available in resolvers
          db: AppDataSource,
          // You can add user authentication here if needed
        }),
      })
    );

    // If you still want your old REST routes for some reason (e.g., migration period)
    // you could keep them, but typically GraphQL would handle this data.
    // app.use('/api/users', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
    });

  } catch (err) {
    console.error('❌ Oracle DB connection failed or Server setup failed:', err);
    process.exit(1);
  }
}

startServer();