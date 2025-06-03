const { gql } = require('graphql-tag');

module.exports = gql`
  type Amenity {
    amenityType: String!
    providedTo: [Provides!]
  }

  input AmenityInput {
    amenityType: String!
  }

  # Extend the existing Query type
  extend type Query {
    amenity(amenityType: String!): Amenity
    amenities: [Amenity!]!
    amenitiesByComplex(complexId: String!): [Provides!]!
  }

  # Extend the existing Mutation type
  extend type Mutation {
    createAmenity(input: AmenityInput!): Amenity!
    deleteAmenity(amenityType: String!): Boolean!
  }
`;