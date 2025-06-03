const AppDataSource = require('../../config/typeorm.config');
const Apartment = require('../../entity/Apartment');
const Building = require('../../entity/Building');
const Resident = require('../../entity/Resident');
const MaintenanceTicket = require('../../entity/MaintenanceTicket');

module.exports = {
    Query: {
        apartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.residents', 'residents')
                .where('apartment.apartmentId = :apartmentId', { apartmentId })
                .getOne();
        },
        apartments: async () => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.residents', 'residents')
                .orderBy('building.buildingNumber', 'ASC')
                .addOrderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        },
        availableApartments: async () => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.residents', 'residents')
                .where('apartment.isAvailable = :isAvailable', { isAvailable: true })
                .orderBy('building.buildingNumber', 'ASC')
                .addOrderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        },
        apartmentsByBuilding: async (_, { buildingId }) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.residents', 'residents')
                .where('apartment.buildingId = :buildingId', { buildingId })
                .orderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createApartment: async (_, { input }) => {
            const apartment = AppDataSource
                .getRepository(Apartment)
                .create(input);
            
            return await AppDataSource
                .getRepository(Apartment)
                .save(apartment);
        },
        updateApartment: async (_, { apartmentId, input }) => {
            await AppDataSource
                .getRepository(Apartment)
                .update({ apartmentId }, input);

            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.residents', 'residents')
                .where('apartment.apartmentId = :apartmentId', { apartmentId })
                .getOne();
        },
        deleteApartment: async (_, { apartmentId }) => {
            const result = await AppDataSource
                .getRepository(Apartment)
                .delete({ apartmentId });
            return result.affected > 0;
        }
    },

    Apartment: {
        building: async (apartment) => {
            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.complex', 'complex')
                .where('building.buildingId = :buildingId', { buildingId: apartment.buildingId })
                .getOne();
        },
        residents: async (apartment) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.apartmentId = :apartmentId', { apartmentId: apartment.apartmentId })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        maintenanceHistory: async (apartment) => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.apartmentId = :apartmentId', { apartmentId: apartment.apartmentId })
                .orderBy('ticket.dateSubmitted', 'DESC')
                .getMany();
        }
    }
}; 