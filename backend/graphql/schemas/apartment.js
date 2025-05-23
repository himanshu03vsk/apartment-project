const { gql } = require('graphql-tag');

module.exports = gql`
  type Apartment {
    aid: String!
    aptNo: Int!
    floorNo: Int!
    numOfBedrooms: Int!
    numOfBathrooms: Int!
    totalSqft: Float!
    petFriendly: Boolean!
    smoking: Boolean!
    furnished: Boolean!
    rent: Int!
    buildingId: String!
    building: Building!
    residents: [Resident!]
    maintenanceTickets: [MaintenanceTicket!]
  }

  input ApartmentInput {
    aptNo: Int!
    floorNo: Int!
    numOfBedrooms: Int!
    numOfBathrooms: Int!
    totalSqft: Float!
    petFriendly: Boolean!
    smoking: Boolean!
    furnished: Boolean!
    rent: Int!
    buildingId: String!
  }

  input ApartmentFilterInput {
    minBedrooms: Int
    maxBedrooms: Int
    minBathrooms: Int
    maxBathrooms: Int
    minRent: Int
    maxRent: Int
    petFriendly: Boolean
    smoking: Boolean
    furnished: Boolean
  }

  extend type Query {
    apartment(aid: String!): Apartment
    apartments: [Apartment!]!
    apartmentsByBuilding(buildingId: String!): [Apartment!]!
    availableApartments(filter: ApartmentFilterInput): [Apartment!]!
  }

  extend type Mutation {
    createApartment(input: ApartmentInput!): Apartment!
    updateApartment(aid: String!, input: ApartmentInput!): Apartment!
    deleteApartment(aid: String!): Boolean!
  }
`; 