const { gql } = require('graphql-tag');

module.exports = gql`
  type Amenity {
    amenityType: String!
  }

  input AmenityInput {
    amenityType: String!
  }

  # Extend the existing Query type
  extend type Query {
    amenity(amenityType: String!): Amenity
    amenities: [Amenity!]!
  }

  # Extend the existing Mutation type
  extend type Mutation {
    createAmenity(input: AmenityInput!): Amenity!
    deleteAmenity(amenityType: String!): Boolean!
  }
`;