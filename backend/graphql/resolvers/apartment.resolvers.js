const AppDataSource = require('../../config/typeorm.config');
const Apartment = require('../../entity/Apartment');
const Building = require('../../entity/Building');
const Lease = require('../../entity/Lease');
const MaintenanceRequest = require('../../entity/MaintenanceRequest');

module.exports = {
    Query: {
        apartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .leftJoinAndSelect('currentLease.resident', 'resident')
                .where('apartment.apartmentId = :apartmentId', { apartmentId })
                .getOne();
        },
        apartments: async () => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .leftJoinAndSelect('currentLease.resident', 'resident')
                .orderBy('building.buildingNumber', 'ASC')
                .addOrderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        },
        availableApartments: async () => {
            const currentDate = new Date();
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.building', 'building')
                .leftJoinAndSelect('building.complex', 'complex')
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .where('currentLease.leaseId IS NULL')
                .orWhere('currentLease.endDate < :currentDate', { currentDate })
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
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .leftJoinAndSelect('currentLease.resident', 'resident')
                .where('apartment.buildingId = :buildingId', { buildingId })
                .orderBy('apartment.apartmentNumber', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createApartment: async (_, { input }) => {
            const apartmentRepository = AppDataSource.getRepository(Apartment);
            const apartment = apartmentRepository.create(input);
            return await apartmentRepository.save(apartment);
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
                .leftJoinAndSelect('apartment.currentLease', 'currentLease')
                .leftJoinAndSelect('currentLease.resident', 'resident')
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
        currentLease: async (apartment) => {
            const currentDate = new Date();
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('lease.apartmentId = :apartmentId', { apartmentId: apartment.apartmentId })
                .andWhere('lease.startDate <= :currentDate', { currentDate })
                .andWhere('lease.endDate >= :currentDate', { currentDate })
                .andWhere('lease.status = :status', { status: 'ACTIVE' })
                .getOne();
        },
        leaseHistory: async (apartment) => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('lease.apartmentId = :apartmentId', { apartmentId: apartment.apartmentId })
                .orderBy('lease.startDate', 'DESC')
                .getMany();
        },
        maintenanceHistory: async (apartment) => {
            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.apartmentId = :apartmentId', { apartmentId: apartment.apartmentId })
                .orderBy('request.dateSubmitted', 'DESC')
                .getMany();
        }
    }
}; 