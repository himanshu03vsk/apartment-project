const { AppDataSource } = require('../../config/data-source');
const Amenity = require('../../entity/Amenity');

const amenityResolvers = {
  Query: {
    amenity: async (_, { amenityType }) => {
      const amenityRepo = AppDataSource.getRepository(Amenity);
      return await amenityRepo.findOne({ 
        where: { amenityType }
      });
    },
    amenities: async () => {
      const amenityRepo = AppDataSource.getRepository(Amenity);
      return await amenityRepo.find();
    }
  },
  Mutation: {
    createAmenity: async (_, { input }) => {
      const amenityRepo = AppDataSource.getRepository(Amenity);
      const amenity = amenityRepo.create(input);
      return await amenityRepo.save(amenity);
    },
    deleteAmenity: async (_, { amenityType }) => {
      const amenityRepo = AppDataSource.getRepository(Amenity);
      const result = await amenityRepo.delete({ amenityType });
      return result.affected > 0;
    }
  }
};

module.exports = amenityResolvers; 