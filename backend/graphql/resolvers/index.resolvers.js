const { merge } = require('lodash');
const amenityResolvers = require('./amenity.resolvers');
const maintenanceResolvers = require('./maintenance.resolvers');
const apartmentResolvers = require('./apartment.resolvers');
const employeeResolvers = require('./employee.resolvers');
const personResolvers = require('./person.resolvers');
const complexResolvers = require('./complex.resolvers');
const buildingResolvers = require('./building.resolvers');
const parkingResolvers = require('./parking.resolvers');
const residentResolvers = require('./resident.resolvers');

// Base resolvers with the required empty resolvers for schema stitching
const baseResolvers = {
  Query: {
    _: () => true,
  },
  Mutation: {
    _: () => true,
  }
};

// Merge all resolvers using lodash merge
const resolvers = merge(
  baseResolvers,
  amenityResolvers,
  maintenanceResolvers,
  apartmentResolvers,
  employeeResolvers,
  personResolvers,
  complexResolvers,
  buildingResolvers,
  parkingResolvers,
  residentResolvers
);

module.exports = resolvers; 