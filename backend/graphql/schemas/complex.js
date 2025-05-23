const { gql } = require('graphql-tag');

module.exports = gql`
  type Complex {
    cid: String!
    complexName: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    mgrSsn: String
    manager: Employee
    employees: [Employee!]
    amenities: [Provides!]
    buildings: [Building!]
    parkingLots: [ParkingLot!]
    applications: [AppliesTo!]
  }

  type Amenity {
    amenityType: String!
  }

  type Provides {
    complexId: String!
    amenType: String!
    quantity: String
    description: String!
    complex: Complex!
    amenity: Amenity!
  }

  input ComplexInput {
    cid: String!
    complexName: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    mgrSsn: String
  }

  input AmenityInput {
    amenityType: String!
  }

  input ProvidesInput {
    complexId: String!
    amenType: String!
    quantity: String
    description: String!
  }

  extend type Query {
    complex(cid: String!): Complex
    complexes: [Complex!]!
    amenity(amenityType: String!): Amenity
    amenities: [Amenity!]!
    complexAmenities(complexId: String!): [Provides!]!
  }

  extend type Mutation {
    createComplex(input: ComplexInput!): Complex!
    updateComplex(cid: String!, input: ComplexInput!): Complex!
    deleteComplex(cid: String!): Boolean!
    createAmenity(input: AmenityInput!): Amenity!
    addAmenityToComplex(input: ProvidesInput!): Provides!
    removeAmenityFromComplex(complexId: String!, amenType: String!): Boolean!
  }
`; 