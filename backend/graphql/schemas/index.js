const { gql } = require('graphql-tag');
// const personSchema = require('./person');
// // const employeeSchema = require('./employee');
// // const complexSchema = require('./complex');
// // const buildingSchema = require('./building');
// // const apartmentSchema = require('./apartment');
// // const residentSchema = require('./resident');
// // const parkingSchema = require('./parking');
// // const maintenanceSchema = require('./maintenance');
const amenitySchema = require('./amenity');

const linkSchema = gql`
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
  amenitySchema,
//   personSchema,
//   // employeeSchema,
//   // complexSchema,
//   // buildingSchema,
//   // apartmentSchema,
//   // residentSchema,
//   // parkingSchema,
//   // maintenanceSchema
]; 





// module.exports = amenitySchema; 