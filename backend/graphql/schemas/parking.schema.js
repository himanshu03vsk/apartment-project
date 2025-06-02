const { gql } = require('graphql-tag');

module.exports = gql`
  type ParkingLot {
    lotId: String!
    lotNo: Int!
    complexId: String!
    complex: Complex!
    parkingSpots: [ParkingSpot!]
  }

  type ParkingSpot {
    spotId: String!
    spotNo: Int!
    lotId: String!
    parkingLot: ParkingLot!
    parkingPermits: [ParkingPermit!]
  }

  type Car {
    licensePlate: String!
    make: String!
    model: String!
    color: String!
    year: Int!
    residentSsn: String!
    resident: Resident!
    parkingPermits: [ParkingPermit!]
  }

  type ParkingPermit {
    permitId: String!
    spotId: String!
    licensePlate: String!
    startDate: Date!
    endDate: Date
    parkingSpot: ParkingSpot!
    car: Car!
  }

  input ParkingLotInput {
    lotNo: Int!
    complexId: String!
  }

  input ParkingSpotInput {
    spotNo: Int!
    lotId: String!
  }

  input CarInput {
    licensePlate: String!
    make: String!
    model: String!
    color: String!
    year: Int!
    residentSsn: String!
  }

  input ParkingPermitInput {
    spotId: String!
    licensePlate: String!
    startDate: Date!
    endDate: Date
  }

  extend type Query {
    parkingLot(lotId: String!): ParkingLot
    parkingLotsByComplex(complexId: String!): [ParkingLot!]!
    parkingSpot(spotId: String!): ParkingSpot
    parkingSpotsByLot(lotId: String!): [ParkingSpot!]!
    car(licensePlate: String!): Car
    carsByResident(residentSsn: String!): [Car!]!
    parkingPermit(permitId: String!): ParkingPermit
    parkingPermitsBySpot(spotId: String!): [ParkingPermit!]!
    parkingPermitsByCar(licensePlate: String!): [ParkingPermit!]!
  }

  extend type Mutation {
    createParkingLot(input: ParkingLotInput!): ParkingLot!
    updateParkingLot(lotId: String!, input: ParkingLotInput!): ParkingLot!
    deleteParkingLot(lotId: String!): Boolean!
    
    createParkingSpot(input: ParkingSpotInput!): ParkingSpot!
    updateParkingSpot(spotId: String!, input: ParkingSpotInput!): ParkingSpot!
    deleteParkingSpot(spotId: String!): Boolean!
    
    createCar(input: CarInput!): Car!
    updateCar(licensePlate: String!, input: CarInput!): Car!
    deleteCar(licensePlate: String!): Boolean!
    
    createParkingPermit(input: ParkingPermitInput!): ParkingPermit!
    updateParkingPermit(permitId: String!, input: ParkingPermitInput!): ParkingPermit!
    deleteParkingPermit(permitId: String!): Boolean!
  }
`; 