const { gql } = require('graphql-tag');

module.exports = gql`
  type Employee {
    empSsn: String!
    superSsn: String
    complexId: String!
    person: Person!
    supervisor: Employee
    subordinates: [Employee!]
    complex: Complex!
    managedComplexes: [Complex!]
    hourlyEmployees: [HourlyEmployee!]
    salaryEmployees: [SalaryEmployee!]
    officeWorkers: [OfficeWorker!]
    maintenanceStaff: [MaintenanceStaff!]
  }

  type HourlyEmployee {
    hourlyEmpSsn: String!
    payPerHour: Float!
    employee: Employee!
  }

  type SalaryEmployee {
    salaryEmpSsn: String!
    salary: Int!
    employee: Employee!
  }

  type OfficeWorker {
    officeEmpSsn: String!
    shiftDate: Date!
    shift: OfficeShift!
    employee: Employee!
  }

  type MaintenanceStaff {
    maintenanceEmpSsn: String!
    shiftDate: Date!
    specialty: MaintenanceSpecialty!
    shift: MaintenanceShift!
    employee: Employee!
    assignedTickets: [MaintenanceTicket!]
  }

  enum OfficeShift {
    MORNING
    AFTERNOON
    EVENING
    ON_CALL
  }

  enum MaintenanceSpecialty {
    ELECTRICIAN
    HVAC
    LANDSCAPE
    GENERAL_MAINTENANCE
    PEST_CONTROL
    JANITORIAL
  }

  enum MaintenanceShift {
    DAY
    ON_CALL
  }

  input EmployeeInput {
    empSsn: String!
    superSsn: String
    complexId: String!
  }

  input HourlyEmployeeInput {
    hourlyEmpSsn: String!
    payPerHour: Float!
  }

  input SalaryEmployeeInput {
    salaryEmpSsn: String!
    salary: Int!
  }

  input OfficeWorkerInput {
    officeEmpSsn: String!
    shiftDate: Date!
    shift: OfficeShift!
  }

  input MaintenanceStaffInput {
    maintenanceEmpSsn: String!
    shiftDate: Date!
    specialty: MaintenanceSpecialty!
    shift: MaintenanceShift!
  }

  extend type Query {
    employee(empSsn: String!): Employee
    employees: [Employee!]!
    hourlyEmployee(hourlyEmpSsn: String!): HourlyEmployee
    hourlyEmployees: [HourlyEmployee!]!
    salaryEmployee(salaryEmpSsn: String!): SalaryEmployee
    salaryEmployees: [SalaryEmployee!]!
    officeWorker(officeEmpSsn: String!, shiftDate: Date!): OfficeWorker
    officeWorkers: [OfficeWorker!]!
    maintenanceStaffMember(maintenanceEmpSsn: String!, shiftDate: Date!): MaintenanceStaff
    maintenanceStaffList: [MaintenanceStaff!]!
  }

  extend type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    createHourlyEmployee(input: HourlyEmployeeInput!): HourlyEmployee!
    createSalaryEmployee(input: SalaryEmployeeInput!): SalaryEmployee!
    createOfficeWorker(input: OfficeWorkerInput!): OfficeWorker!
    createMaintenanceStaff(input: MaintenanceStaffInput!): MaintenanceStaff!
    deleteEmployee(empSsn: String!): Boolean!
  }
`; 