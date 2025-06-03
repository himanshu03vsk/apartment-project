const AppDataSource = require('../../config/typeorm.config');
const MaintenanceTicket = require('../../entity/MaintenanceTicket');
const MaintenanceStaff = require('../../entity/MaintenanceStaff');
const Apartment = require('../../entity/Apartment');
const Resident = require('../../entity/Resident');

module.exports = {
    Query: {
        maintenanceTicket: async (_, { ticketId }) => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.ticketId = :ticketId', { ticketId })
                .getOne();
        },
        maintenanceTickets: async () => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .orderBy('ticket.dateSubmitted', 'DESC')
                .getMany();
        },
        maintenanceTicketsByApartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.apartmentId = :apartmentId', { apartmentId })
                .orderBy('ticket.dateSubmitted', 'DESC')
                .getMany();
        },
        maintenanceStaff: async (_, { staffId }) => {
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .leftJoinAndSelect('staff.assignedTickets', 'tickets')
                .where('staff.staffId = :staffId', { staffId })
                .getOne();
        },
        maintenanceStaffList: async () => {
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .leftJoinAndSelect('staff.assignedTickets', 'tickets')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createMaintenanceTicket: async (_, { input }) => {
            const ticket = AppDataSource
                .getRepository(MaintenanceTicket)
                .create({
                    ...input,
                    dateSubmitted: new Date(),
                    status: 'PENDING'
                });
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .save(ticket);
        },
        updateMaintenanceTicket: async (_, { ticketId, input }) => {
            await AppDataSource
                .getRepository(MaintenanceTicket)
                .update({ ticketId }, input);

            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.ticketId = :ticketId', { ticketId })
                .getOne();
        },
        assignMaintenanceStaff: async (_, { ticketId, staffId }) => {
            await AppDataSource
                .getRepository(MaintenanceTicket)
                .update({ ticketId }, { 
                    staffId,
                    status: 'ASSIGNED',
                    dateAssigned: new Date()
                });

            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.ticketId = :ticketId', { ticketId })
                .getOne();
        },
        completeMaintenanceTicket: async (_, { ticketId, completionNotes }) => {
            await AppDataSource
                .getRepository(MaintenanceTicket)
                .update({ ticketId }, {
                    status: 'COMPLETED',
                    dateCompleted: new Date(),
                    completionNotes
                });

            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.assignedStaff', 'staff')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.ticketId = :ticketId', { ticketId })
                .getOne();
        }
    },

    MaintenanceTicket: {
        apartment: async (ticket) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.complex', 'complex')
                .where('apartment.apartmentId = :apartmentId', { apartmentId: ticket.apartmentId })
                .getOne();
        },
        resident: async (ticket) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.residentSsn = :residentSsn', { residentSsn: ticket.residentSsn })
                .getOne();
        },
        assignedStaff: async (ticket) => {
            if (!ticket.staffId) return null;
            return await AppDataSource
                .getRepository(MaintenanceStaff)
                .createQueryBuilder('staff')
                .leftJoinAndSelect('staff.person', 'person')
                .where('staff.staffId = :staffId', { staffId: ticket.staffId })
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
        assignedTickets: async (staff) => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.apartment', 'apartment')
                .leftJoinAndSelect('ticket.resident', 'resident')
                .where('ticket.staffId = :staffId', { staffId: staff.staffId })
                .orderBy('ticket.dateSubmitted', 'DESC')
                .getMany();
        }
    }
}; 