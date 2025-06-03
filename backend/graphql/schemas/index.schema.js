const { gql } = require('graphql-tag');
const personSchema = require('./person.schema');
const employeeSchema = require('./employee.schema');
const complexSchema = require('./complex.schema');
const buildingSchema = require('./building.schema');
const apartmentSchema = require('./apartment.schema');
const residentSchema = require('./resident.schema');
const parkingSchema = require('./parking.schema');
const maintenanceSchema = require('./maintenance.schema');
const amenitySchema = require('./amenity.schema');

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  personSchema,
  employeeSchema,
  complexSchema,
  buildingSchema,
  apartmentSchema,
  residentSchema,
  parkingSchema,
  maintenanceSchema,
  amenitySchema
]; 





// module.exports = amenitySchema; 