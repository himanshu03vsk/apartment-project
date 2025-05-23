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
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express'); // <--- New: Apollo Server

const { AppDataSource } = require('./config/data-source');
// You'll create these files:
const typeDefs = require('./graphql/schema');         // <--- New: GraphQL Schema
const resolvers = require('./graphql/resolvers');     // <--- New: GraphQL Resolvers
// const userRoutes = require('./routes/userRoutes'); // <--- This would be largely replaced by resolvers

const app = express();
app.use(cors());
app.use(express.json()); // Still useful if you have any REST endpoints or for Apollo Server itself

async function startServer() {
  // DB Initialization
  try {
    await AppDataSource.initialize();
    console.log('✅ Oracle connected via TypeORM');

    // Create Apollo Server instance
    const server = new ApolloServer({
      typeDefs,  // Your GraphQL schema
      resolvers, // Your functions that fetch the data for your schema
      // You can add context here to make AppDataSource available to all resolvers
      // context: () => ({ db: AppDataSource })
      // This helps avoid importing AppDataSource in every resolver file.
    });

    // Start the Apollo Server before applying middleware
    await server.start();

    // Apply Apollo GraphQL middleware and set path to /graphql
    server.applyMiddleware({ app, path: '/graphql' }); // <--- New: GraphQL endpoint

    // If you still want your old REST routes for some reason (e.g., migration period)
    // you could keep them, but typically GraphQL would handle this data.
    // app.use('/api/users', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
    });

  } catch (err) {
    console.error('❌ Oracle DB connection failed or Server setup failed:', err);
  }
}

startServer();