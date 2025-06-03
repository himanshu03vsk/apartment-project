const { gql } = require('graphql-tag');

module.exports = gql`
  type MaintenanceTicket {
    ticketId: ID!
    apartment: Apartment!
    resident: Resident!
    assignedStaff: MaintenanceStaff
    description: String!
    status: TicketStatus!
    priority: Priority!
    dateSubmitted: Date!
    dateAssigned: Date
    dateCompleted: Date
    completionNotes: String
  }

  type MaintenanceStaff {
    staffId: ID!
    person: Person!
    assignedTickets: [MaintenanceTicket!]!
    specialization: String
    certification: String
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    EMERGENCY
  }

  enum TicketStatus {
    PENDING
    ASSIGNED
    COMPLETED
    CANCELLED
  }

  input MaintenanceTicketInput {
    apartmentId: ID!
    residentSsn: String!
    description: String!
    priority: Priority!
  }

  extend type Query {
    maintenanceTicket(ticketId: ID!): MaintenanceTicket
    maintenanceTickets: [MaintenanceTicket!]!
    maintenanceTicketsByApartment(apartmentId: ID!): [MaintenanceTicket!]!
    maintenanceStaff(staffId: ID!): MaintenanceStaff
    maintenanceStaffList: [MaintenanceStaff!]!
  }

  extend type Mutation {
    createMaintenanceTicket(input: MaintenanceTicketInput!): MaintenanceTicket!
    updateMaintenanceTicket(ticketId: ID!, input: MaintenanceTicketInput!): MaintenanceTicket!
    assignMaintenanceStaff(ticketId: ID!, staffId: ID!): MaintenanceTicket!
    completeMaintenanceTicket(ticketId: ID!, completionNotes: String!): MaintenanceTicket!
  }
`; 