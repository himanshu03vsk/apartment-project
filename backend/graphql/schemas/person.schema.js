const { gql } = require('graphql-tag');

module.exports = gql`
  type Person {
    ssn: String!
    fname: String!
    minit: String
    lname: String!
    dateOfBirth: Date!
    gender: Gender!
    ethnicity: String
    contact: String!
    maritalStatus: MaritalStatus!
    applicants: [Applicant!]
    employees: [Employee!]
    residents: [Resident!]
  }

  enum Gender {
    Male
    Female
    PREFER_NOT_TO_SAY
  }

  enum MaritalStatus {
    MARRIED
    SINGLE
    DIVORCED
    WIDOWED
  }

  input PersonInput {
    ssn: String!
    fname: String!
    minit: String
    lname: String!
    dateOfBirth: Date!
    gender: Gender!
    ethnicity: String
    contact: String!
    maritalStatus: MaritalStatus!
  }

  input PersonUpdateInput {
    fname: String
    minit: String
    lname: String
    dateOfBirth: Date
    gender: Gender
    ethnicity: String
    contact: String
    maritalStatus: MaritalStatus
  }

  extend type Query {
    person(ssn: String!): Person
    people: [Person!]!
    searchPeople(searchTerm: String!): [Person!]!
  }

  extend type Mutation {
    createPerson(input: PersonInput!): Person!
    updatePerson(ssn: String!, input: PersonUpdateInput!): Person!
    deletePerson(ssn: String!): Boolean!
  }

  scalar Date
`; 