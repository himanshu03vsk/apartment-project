const { AppDataSource } = require('../../config/data-source');

const maintenanceResolvers = {
  Query: {
    maintenanceTicket: async (_, { id }) => {
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      return await ticketRepo.findOne({
        where: { id },
        relations: ['apartment', 'worksOn', 'worksOn.maintenanceStaff']
      });
    },
    maintenanceTickets: async (_, { status, apartmentId }) => {
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      const query = ticketRepo.createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.apartment', 'apartment')
        .leftJoinAndSelect('ticket.worksOn', 'worksOn')
        .leftJoinAndSelect('worksOn.maintenanceStaff', 'staff');

      if (status) {
        query.andWhere('ticket.status = :status', { status });
      }
      
      if (apartmentId) {
        query.andWhere('apartment.id = :apartmentId', { apartmentId });
      }

      return await query.getMany();
    },
    maintenanceStaffList: async () => {
      const staffRepo = AppDataSource.getRepository('MaintenanceStaff');
      return await staffRepo.find({
        relations: ['employee', 'employee.person', 'worksOn', 'worksOn.maintenanceTicket']
      });
    },
    maintenanceStaffMember: async (_, { maintenanceEmpSsn, shiftDate }) => {
      const staffRepo = AppDataSource.getRepository('MaintenanceStaff');
      return await staffRepo.findOne({
        where: { maintenanceEmpSsn, shiftDate },
        relations: ['employee', 'employee.person', 'worksOn', 'worksOn.maintenanceTicket']
      });
    }
  },
  Mutation: {
    createMaintenanceTicket: async (_, { input }) => {
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      const ticket = ticketRepo.create(input);
      return await ticketRepo.save(ticket);
    },
    updateTicketStatus: async (_, { id, status }) => {
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      await ticketRepo.update(id, { status });
      return await ticketRepo.findOne({ where: { id } });
    },
    assignMaintenanceStaff: async (_, { ticketId, staffId }) => {
      const worksOnRepo = AppDataSource.getRepository('WorksOn');
      const worksOn = worksOnRepo.create({
        maintenanceTicketId: ticketId,
        maintenanceStaffId: staffId,
        assignedDate: new Date()
      });
      await worksOnRepo.save(worksOn);
      
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      return await ticketRepo.findOne({
        where: { id: ticketId },
        relations: ['worksOn', 'worksOn.maintenanceStaff']
      });
    }
  },
  // Type resolvers
  MaintenanceTicket: {
    apartment: async (ticket) => {
      if (ticket.apartment) return ticket.apartment;
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      const fullTicket = await ticketRepo.findOne({
        where: { id: ticket.id },
        relations: ['apartment']
      });
      return fullTicket?.apartment;
    },
    assignedStaff: async (ticket) => {
      if (ticket.worksOn) return ticket.worksOn.map(w => w.maintenanceStaff);
      const ticketRepo = AppDataSource.getRepository('MaintenanceTicket');
      const fullTicket = await ticketRepo.findOne({
        where: { id: ticket.id },
        relations: ['worksOn', 'worksOn.maintenanceStaff']
      });
      return fullTicket?.worksOn?.map(w => w.maintenanceStaff) || [];
    }
  }
};

module.exports = maintenanceResolvers; 