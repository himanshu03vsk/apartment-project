const AppDataSource = require('../../config/typeorm.config');
const Employee = require('../../entity/Employee');
const Person = require('../../entity/Person');
const Complex = require('../../entity/Complex');

module.exports = {
    Query: {
        employee: async (_, { employeeId }) => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.employeeId = :employeeId', { employeeId })
                .getOne();
        },
        employees: async () => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        employeesByComplex: async (_, { complexId }) => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.complexId = :complexId', { complexId })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        employeesByRole: async (_, { role }) => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.role = :role', { role })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createEmployee: async (_, { input }) => {
            const employeeRepository = AppDataSource.getRepository(Employee);
            const employee = employeeRepository.create({
                ...input,
                startDate: new Date(),
                status: 'ACTIVE'
            });
            return await employeeRepository.save(employee);
        },
        updateEmployee: async (_, { employeeId, input }) => {
            await AppDataSource
                .getRepository(Employee)
                .update({ employeeId }, input);

            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.employeeId = :employeeId', { employeeId })
                .getOne();
        },
        terminateEmployee: async (_, { employeeId, terminationReason }) => {
            await AppDataSource
                .getRepository(Employee)
                .update({ employeeId }, {
                    status: 'TERMINATED',
                    endDate: new Date(),
                    terminationReason
                });

            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.employeeId = :employeeId', { employeeId })
                .getOne();
        }
    },

    Employee: {
        person: async (employee) => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .where('person.ssn = :ssn', { ssn: employee.personSsn })
                .getOne();
        },
        complex: async (employee) => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .where('complex.complexId = :complexId', { complexId: employee.complexId })
                .getOne();
        }
    }
}; 