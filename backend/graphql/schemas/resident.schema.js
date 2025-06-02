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
    femaLetters: [FemaLetter!]
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

  type Applicant {
    applicantSsn: String!
    person: Person!
    applications: [AppliesTo!]
  }

  type AppliesTo {
    applicantSsn: String!
    complexId: String!
    numOfBedrooms: Int!
    numOfBathrooms: Int!
    appliedDate: Date!
    status: ApplicationStatus!
    applicant: Applicant!
    complex: Complex!
  }

  enum ApplicationStatus {
    PENDING
    APPROVED
    REJECTED
    WAITLISTED
    CANCELLED
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

  type User {
    id: Int!
    name: String!
    email: String!
    role: UserRole!
  }

  enum UserRole {
    ADMIN
    MANAGER
    STAFF
    RESIDENT
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

  input ApplicantInput {
    applicantSsn: String!
    personId: String!
  }

  input AppliesToInput {
    applicantSsn: String!
    complexId: String!
    numOfBedrooms: Int!
    numOfBathrooms: Int!
    appliedDate: Date!
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

  input UserInput {
    name: String!
    email: String!
    role: UserRole!
  }

  extend type Query {
    # Resident Queries
    resident(residentSsn: String!): Resident
    residents: [Resident!]!
    residentsByApartment(apartmentId: String!): [Resident!]!
    
    # RentPayment Queries
    rentPayment(residentSsn: String!, paymentDate: Date!): RentPayment
    rentPaymentsByResident(residentSsn: String!): [RentPayment!]!
    
    # Applicant Queries
    applicant(applicantSsn: String!): Applicant
    applicants: [Applicant!]!
    
    # AppliesTo Queries
    application(applicantSsn: String!, complexId: String!): AppliesTo
    applicationsByComplex(complexId: String!): [AppliesTo!]!
    applicationsByApplicant(applicantSsn: String!): [AppliesTo!]!
    
    # FemaLetter Queries
    femaLetter(buildingId: String!, caseNo: String!): FemaLetter
    femaLettersByBuilding(buildingId: String!): [FemaLetter!]!
    
    # User Queries
    user(id: Int!): User
    users: [User!]!
    usersByRole(role: UserRole!): [User!]!
  }

  extend type Mutation {
    # Resident Mutations
    createResident(input: ResidentInput!): Resident!
    updateResident(residentSsn: String!, input: ResidentInput!): Resident!
    deleteResident(residentSsn: String!): Boolean!
    
    # RentPayment Mutations
    createRentPayment(input: RentPaymentInput!): RentPayment!
    
    # Applicant Mutations
    createApplicant(input: ApplicantInput!): Applicant!
    deleteApplicant(applicantSsn: String!): Boolean!
    
    # AppliesTo Mutations
    createApplication(input: AppliesToInput!): AppliesTo!
    updateApplicationStatus(applicantSsn: String!, complexId: String!, status: ApplicationStatus!): AppliesTo!
    deleteApplication(applicantSsn: String!, complexId: String!): Boolean!
    
    # FemaLetter Mutations
    createFemaLetter(input: FemaLetterInput!): FemaLetter!
    updateFemaLetter(buildingId: String!, caseNo: String!, input: FemaLetterInput!): FemaLetter!
    deleteFemaLetter(buildingId: String!, caseNo: String!): Boolean!
    
    # User Mutations
    createUser(input: UserInput!): User!
    updateUser(id: Int!, input: UserInput!): User!
    deleteUser(id: Int!): Boolean!
  }
`; 