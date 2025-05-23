const { gql } = require('graphql-tag');

module.exports = gql`
  type Building {
    bid: String!
    buildingNo: Int!
    numOfFloors: Int!
    complexId: String!
    complex: Complex!
    femaLetters: [FemaLetter!]
    apartments: [Apartment!]
  }

  type FemaLetter {
    buildingId: String!
    caseNo: String!
    lotNo: Int
    blockNo: Int
    sectionNo: Int
    subdivision: String
    strAdd: String
    floodZone: String!
    baseFloodElev: Float
    lowestAdjGradeElev: Float
    lowestLotElev: Float
    building: Building!
  }

  input BuildingInput {
    buildingNo: Int!
    numOfFloors: Int!
    complexId: String!
  }

  input FemaLetterInput {
    buildingId: String!
    caseNo: String!
    lotNo: Int
    blockNo: Int
    sectionNo: Int
    subdivision: String
    strAdd: String
    floodZone: String!
    baseFloodElev: Float
    lowestAdjGradeElev: Float
    lowestLotElev: Float
  }

  extend type Query {
    building(bid: String!): Building
    buildingsByComplex(complexId: String!): [Building!]!
    femaLetter(buildingId: String!, caseNo: String!): FemaLetter
    femaLettersByBuilding(buildingId: String!): [FemaLetter!]!
  }

  extend type Mutation {
    createBuilding(input: BuildingInput!): Building!
    updateBuilding(bid: String!, input: BuildingInput!): Building!
    deleteBuilding(bid: String!): Boolean!
    createFemaLetter(input: FemaLetterInput!): FemaLetter!
    updateFemaLetter(buildingId: String!, caseNo: String!, input: FemaLetterInput!): FemaLetter!
    deleteFemaLetter(buildingId: String!, caseNo: String!): Boolean!
  }
`; 