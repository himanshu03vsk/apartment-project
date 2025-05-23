const { gql } = require('graphql-tag');

module.exports = gql`
  type MaintenanceTicket {
    ticketId: String!
    apartmentId: String!
    residentSsn: String!
    description: String!
    priority: Priority!
    status: Status!
    submissionDate: Date!
    completionDate: Date
    apartment: Apartment!
    resident: Resident!
    worksOnTickets: [WorksOn!]
  }

  type WorksOn {
    ticketId: String!
    maintenanceEmpSsn: String!
    startDate: Date!
    endDate: Date
    maintenanceStaff: MaintenanceStaff!
    maintenanceTicket: MaintenanceTicket!
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    EMERGENCY
  }

  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }

  input MaintenanceTicketInput {
    apartmentId: String!
    residentSsn: String!
    description: String!
    priority: Priority!
  }

  input MaintenanceTicketUpdateInput {
    description: String
    priority: Priority
    status: Status
    completionDate: Date
  }

  input WorksOnInput {
    ticketId: String!
    maintenanceEmpSsn: String!
    startDate: Date!
    endDate: Date
  }

  extend type Query {
    maintenanceTicket(ticketId: String!): MaintenanceTicket
    maintenanceTickets: [MaintenanceTicket!]!
    maintenanceTicketsByApartment(apartmentId: String!): [MaintenanceTicket!]!
    maintenanceTicketsByResident(residentSsn: String!): [MaintenanceTicket!]!
    maintenanceTicketsByStatus(status: Status!): [MaintenanceTicket!]!
    maintenanceTicketsByPriority(priority: Priority!): [MaintenanceTicket!]!
    worksOnByTicket(ticketId: String!): [WorksOn!]!
    worksOnByStaff(maintenanceEmpSsn: String!): [WorksOn!]!
  }

  extend type Mutation {
    createMaintenanceTicket(input: MaintenanceTicketInput!): MaintenanceTicket!
    updateMaintenanceTicket(ticketId: String!, input: MaintenanceTicketUpdateInput!): MaintenanceTicket!
    deleteMaintenanceTicket(ticketId: String!): Boolean!
    assignMaintenanceStaff(input: WorksOnInput!): WorksOn!
    updateWorkAssignment(ticketId: String!, maintenanceEmpSsn: String!, input: WorksOnInput!): WorksOn!
    removeWorkAssignment(ticketId: String!, maintenanceEmpSsn: String!): Boolean!
  }
`; 