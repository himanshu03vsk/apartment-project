const { AppDataSource } = require('../../config/data-source');

const apartmentResolvers = {
  Query: {
    apartment: async (_, { id }) => {
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      return await apartmentRepo.findOne({
        where: { id },
        relations: ['building', 'residents', 'maintenanceTickets']
      });
    },
    apartments: async (_, { buildingId, available }) => {
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      const query = apartmentRepo.createQueryBuilder('apartment')
        .leftJoinAndSelect('apartment.building', 'building')
        .leftJoinAndSelect('apartment.residents', 'residents');

      if (buildingId) {
        query.andWhere('building.id = :buildingId', { buildingId });
      }
      
      if (available !== undefined) {
        query.andWhere('apartment.isAvailable = :available', { available });
      }

      return await query.getMany();
    }
  },
  Mutation: {
    createApartment: async (_, { input }) => {
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      const apartment = apartmentRepo.create(input);
      return await apartmentRepo.save(apartment);
    },
    updateApartmentAvailability: async (_, { id, isAvailable }) => {
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      await apartmentRepo.update(id, { isAvailable });
      return await apartmentRepo.findOne({ where: { id } });
    }
  },
  // Type resolvers
  Apartment: {
    building: async (apartment) => {
      if (apartment.building) return apartment.building;
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      const fullApartment = await apartmentRepo.findOne({
        where: { id: apartment.id },
        relations: ['building']
      });
      return fullApartment?.building;
    },
    residents: async (apartment) => {
      if (apartment.residents) return apartment.residents;
      const apartmentRepo = AppDataSource.getRepository('Apartment');
      const fullApartment = await apartmentRepo.findOne({
        where: { id: apartment.id },
        relations: ['residents']
      });
      return fullApartment?.residents || [];
    }
  }
};

module.exports = apartmentResolvers; 