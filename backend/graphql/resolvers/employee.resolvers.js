const { AppDataSource } = require('../../config/data-source');

const employeeResolvers = {
  Query: {
    employee: async (_, { id }) => {
      const employeeRepo = AppDataSource.getRepository('Employee');
      return await employeeRepo.findOne({ 
        where: { id },
        relations: ['person', 'salaryEmployee', 'hourlyEmployee', 'officeWorker', 'maintenanceStaff']
      });
    },
    employees: async () => {
      const employeeRepo = AppDataSource.getRepository('Employee');
      return await employeeRepo.find({
        relations: ['person', 'salaryEmployee', 'hourlyEmployee', 'officeWorker', 'maintenanceStaff']
      });
    }
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      const employeeRepo = AppDataSource.getRepository('Employee');
      const employee = employeeRepo.create(input);
      return await employeeRepo.save(employee);
    }
  },
  // Type resolvers
  Employee: {
    person: async (employee) => {
      if (employee.person) return employee.person;
      const employeeRepo = AppDataSource.getRepository('Employee');
      const fullEmployee = await employeeRepo.findOne({
        where: { id: employee.id },
        relations: ['person']
      });
      return fullEmployee?.person;
    }
  }
};

module.exports = employeeResolvers; 