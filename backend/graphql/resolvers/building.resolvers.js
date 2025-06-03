const AppDataSource = require('../../config/typeorm.config');
const Building = require('../../entity/Building');
const Complex = require('../../entity/Complex');
const Apartment = require('../../entity/Apartment');
const FemaLetter = require('../../entity/FemaLetter');

module.exports = {
    Query: {
        building: async (_, { buildingId }) => {
            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('building.apartments', 'apartments')
                .where('building.buildingId = :buildingId', { buildingId })
                .getOne();
        },
        buildings: async () => {
            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('building.apartments', 'apartments')
                .orderBy('building.buildingNumber', 'ASC')
                .getMany();
        },
        buildingsByComplex: async (_, { complexId }) => {
            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('building.apartments', 'apartments')
                .where('building.complexId = :complexId', { complexId })
                .orderBy('building.buildingNumber', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createBuilding: async (_, { input }) => {
            const buildingRepository = AppDataSource.getRepository(Building);
            const building = buildingRepository.create(input);
            return await buildingRepository.save(building);
        },
        updateBuilding: async (_, { buildingId, input }) => {
            await AppDataSource
                .getRepository(Building)
                .update({ buildingId }, input);

            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('building.apartments', 'apartments')
                .where('building.buildingId = :buildingId', { buildingId })
                .getOne();
        },
        deleteBuilding: async (_, { buildingId }) => {
            const result = await AppDataSource
                .getRepository(Building)
                .delete({ buildingId });
            return result.affected > 0;
        }
    },

    Building: {
        complex: async (building) => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .where('complex.complexId = :complexId', { complexId: building.complexId })
                .getOne();
        },
        apartments: async (building) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .where('apartment.buildingId = :buildingId', { buildingId: building.buildingId })
                .orderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        },
        // occupancyRate: async (building) => {
        //     const apartments = await AppDataSource
        //         .getRepository(Apartment)
        //         .createQueryBuilder('apartment')
        //         .leftJoinAndSelect('apartment.currentLease', 'currentLease')
        //         .where('apartment.buildingId = :buildingId', { buildingId: building.buildingId })
        //         .getMany();

        //     const occupiedCount = apartments.filter(apt => apt.currentLease && apt.currentLease.status === 'ACTIVE').length;
        //     return apartments.length > 0 ? (occupiedCount / apartments.length) * 100 : 0;
        // },
        femaLetters: async (building) => {
            const femaLetterRepository = AppDataSource.getRepository(FemaLetter);
            return await femaLetterRepository.find({ 
                where: { buildingId: building.buildingId }
            });
        }
    }
}; 