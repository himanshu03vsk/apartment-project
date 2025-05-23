const { gql } = require('graphql-tag');

module.exports = gql`
  type Amenity {
    amenityType: String!
  }

  input AmenityInput {
    amenityType: String!
  }

  type Query {
    amenity(amenityType: String!): Amenity
    amenities: [Amenity!]!
  }

  type Mutation {
    createAmenity(input: AmenityInput!): Amenity!
    deleteAmenity(amenityType: String!): Boolean!
  }
`; 