const { gql } = require('graphql-tag');

module.exports = gql`
  type Resident {
    residentSsn: String!
    apartmentId: String!
    moveInDate: Date!
    moveOutDate: Date
    person: Person!
    apartment: Apartment!
    rentPayments: [RentPayment!]
    maintenanceTickets: [MaintenanceTicket!]
    cars: [Car!]
  }

  type RentPayment {
    residentSsn: String!
    paymentDate: Date!
    amount: Float!
    paymentMethod: PaymentMethod!
    resident: Resident!
  }

  enum PaymentMethod {
    CASH
    CHECK
    CREDIT_CARD
    DEBIT_CARD
    BANK_TRANSFER
  }

  input ResidentInput {
    residentSsn: String!
    apartmentId: String!
    moveInDate: Date!
    moveOutDate: Date
  }

  input RentPaymentInput {
    residentSsn: String!
    paymentDate: Date!
    amount: Float!
    paymentMethod: PaymentMethod!
  }

  extend type Query {
    resident(residentSsn: String!): Resident
    residents: [Resident!]!
    residentsByApartment(apartmentId: String!): [Resident!]!
    rentPayment(residentSsn: String!, paymentDate: Date!): RentPayment
    rentPaymentsByResident(residentSsn: String!): [RentPayment!]!
  }

  extend type Mutation {
    createResident(input: ResidentInput!): Resident!
    updateResident(residentSsn: String!, input: ResidentInput!): Resident!
    deleteResident(residentSsn: String!): Boolean!
    createRentPayment(input: RentPaymentInput!): RentPayment!
  }
`; 