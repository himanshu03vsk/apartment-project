const AppDataSource = require('../../config/typeorm.config');
const Amenity = require('../../entity/Amenity');
const Complex = require('../../entity/Complex');

module.exports = {
    Query: {
        amenity: async (_, { amenityId }) => {
            return await AppDataSource
                .getRepository(Amenity)
                .createQueryBuilder('amenity')
                .leftJoinAndSelect('amenity.complex', 'complex')
                .where('amenity.amenityId = :amenityId', { amenityId })
                .getOne();
        },
        amenities: async () => {
            return await AppDataSource
                .getRepository(Amenity)
                .createQueryBuilder('amenity')
                .leftJoinAndSelect('amenity.complex', 'complex')
                .orderBy('amenity.name', 'ASC')
                .getMany();
        },
        amenitiesByComplex: async (_, { complexId }) => {
            return await AppDataSource
                .getRepository(Amenity)
                .createQueryBuilder('amenity')
                .leftJoinAndSelect('amenity.complex', 'complex')
                .where('amenity.complexId = :complexId', { complexId })
                .orderBy('amenity.name', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createAmenity: async (_, { input }) => {
            const amenityRepository = AppDataSource.getRepository(Amenity);
            const amenity = amenityRepository.create(input);
            return await amenityRepository.save(amenity);
        },
        updateAmenity: async (_, { amenityId, input }) => {
            await AppDataSource
                .getRepository(Amenity)
                .update({ amenityId }, input);

            return await AppDataSource
                .getRepository(Amenity)
                .createQueryBuilder('amenity')
                .leftJoinAndSelect('amenity.complex', 'complex')
                .where('amenity.amenityId = :amenityId', { amenityId })
                .getOne();
        },
        deleteAmenity: async (_, { amenityId }) => {
            const result = await AppDataSource
                .getRepository(Amenity)
                .delete({ amenityId });
            return result.affected > 0;
        }
    },

    Amenity: {
        complex: async (amenity) => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .where('complex.complexId = :complexId', { complexId: amenity.complexId })
                .getOne();
        }
    }
}; 