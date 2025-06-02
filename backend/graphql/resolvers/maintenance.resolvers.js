const AppDataSource = require('../../config/typeorm.config');
const MaintenanceRequest = require('../../entity/MaintenanceRequest');
const MaintenanceStaff = require('../../entity/MaintenanceStaff');
const Apartment = require('../../entity/Apartment');
const Resident = require('../../entity/Resident');

module.exports = {
    Query: {
        maintenanceRequest: async (_, { requestId }) => {
            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.requestId = :requestId', { requestId })
                .getOne();
        },
        maintenanceRequests: async () => {
            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .orderBy('request.dateSubmitted', 'DESC')
                .getMany();
        },
        maintenanceRequestsByApartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.apartmentId = :apartmentId', { apartmentId })
                .orderBy('request.dateSubmitted', 'DESC')
                .getMany();
        },
        maintenanceStaff: async (_, { staffId }) => {
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .leftJoinAndSelect('staff.assignedRequests', 'requests')
                .where('staff.staffId = :staffId', { staffId })
                .getOne();
        },
        maintenanceStaffList: async () => {
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .leftJoinAndSelect('staff.assignedRequests', 'requests')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createMaintenanceRequest: async (_, { input }) => {
            const maintenanceRequestRepository = AppDataSource.getRepository(MaintenanceRequest);
            const request = maintenanceRequestRepository.create({
                ...input,
                dateSubmitted: new Date(),
                status: 'PENDING'
            });
            return await maintenanceRequestRepository.save(request);
        },
        updateMaintenanceRequest: async (_, { requestId, input }) => {
            await AppDataSource
                .getRepository(MaintenanceRequest)
                .update({ requestId }, input);

            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.requestId = :requestId', { requestId })
                .getOne();
        },
        assignMaintenanceStaff: async (_, { requestId, staffId }) => {
            await AppDataSource
                .getRepository(MaintenanceRequest)
                .update({ requestId }, { 
                    staffId,
                    status: 'ASSIGNED',
                    dateAssigned: new Date()
                });

            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.requestId = :requestId', { requestId })
                .getOne();
        },
        completeMaintenanceRequest: async (_, { requestId, completionNotes }) => {
            await AppDataSource
                .getRepository(MaintenanceRequest)
                .update({ requestId }, {
                    status: 'COMPLETED',
                    dateCompleted: new Date(),
                    completionNotes
                });

            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.assignedStaff', 'staff')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.requestId = :requestId', { requestId })
                .getOne();
        }
    },

    MaintenanceRequest: {
        apartment: async (request) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.complex', 'complex')
                .where('apartment.apartmentId = :apartmentId', { apartmentId: request.apartmentId })
                .getOne();
        },
        resident: async (request) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.residentSsn = :residentSsn', { residentSsn: request.residentSsn })
                .getOne();
        },
        assignedStaff: async (request) => {
            if (!request.staffId) return null;
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .where('staff.staffId = :staffId', { staffId: request.staffId })
                .getOne();
        }
    },

    MaintenanceStaff: {
        person: async (staff) => {
            return await AppDataSource
                .getRepository('Person')
                .createQueryBuilder('person')
                .where('person.ssn = :ssn', { ssn: staff.personSsn })
                .getOne();
        },
        assignedRequests: async (staff) => {
            return await AppDataSource
                .getRepository(MaintenanceRequest)
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.apartment', 'apartment')
                .leftJoinAndSelect('request.resident', 'resident')
                .where('request.staffId = :staffId', { staffId: staff.staffId })
                .orderBy('request.dateSubmitted', 'DESC')
                .getMany();
        }
    }
}; 