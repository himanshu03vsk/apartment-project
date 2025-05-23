const { merge } = require('lodash');
const amenityResolvers = require('./amenity.resolvers');

// Base resolvers with the required empty resolvers for schema stitching
const baseResolvers = {
  Query: {
    _: () => true,
  },
  Mutation: {
    _: () => true,
  }
};

// Merge all resolvers using lodash merge
const resolvers = merge(
  baseResolvers,
  amenityResolvers
);

module.exports = resolvers; 