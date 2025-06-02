const AppDataSource = require('../../config/typeorm.config');
const Person = require('../../entity/Person');
const Employee = require('../../entity/Employee');
const Resident = require('../../entity/Resident');

module.exports = {
    Query: {
        person: async (_, { ssn }) => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .leftJoinAndSelect('person.employee', 'employee')
                .leftJoinAndSelect('person.resident', 'resident')
                .where('person.ssn = :ssn', { ssn })
                .getOne();
        },
        people: async () => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .leftJoinAndSelect('person.employee', 'employee')
                .leftJoinAndSelect('person.resident', 'resident')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        searchPeople: async (_, { searchTerm }) => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .leftJoinAndSelect('person.employee', 'employee')
                .leftJoinAndSelect('person.resident', 'resident')
                .where('LOWER(person.firstName) LIKE LOWER(:searchTerm)', { searchTerm: `%${searchTerm}%` })
                .orWhere('LOWER(person.lastName) LIKE LOWER(:searchTerm)', { searchTerm: `%${searchTerm}%` })
                .orWhere('person.ssn LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                .orWhere('person.email LIKE LOWER(:searchTerm)', { searchTerm: `%${searchTerm}%` })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createPerson: async (_, { input }) => {
            const personRepository = AppDataSource.getRepository(Person);
            const person = personRepository.create(input);
            return await personRepository.save(person);
        },
        updatePerson: async (_, { ssn, input }) => {
            await AppDataSource
                .getRepository(Person)
                .update({ ssn }, input);

            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .leftJoinAndSelect('person.employee', 'employee')
                .leftJoinAndSelect('person.resident', 'resident')
                .where('person.ssn = :ssn', { ssn })
                .getOne();
        },
        deletePerson: async (_, { ssn }) => {
            const result = await AppDataSource
                .getRepository(Person)
                .delete({ ssn });
            return result.affected > 0;
        }
    },

    Person: {
        employee: async (person) => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.complex', 'complex')
                .where('employee.personSsn = :ssn', { ssn: person.ssn })
                .getOne();
        },
        resident: async (person) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.apartment', 'apartment')
                .leftJoinAndSelect('resident.lease', 'lease')
                .where('resident.personSsn = :ssn', { ssn: person.ssn })
                .getOne();
        }
    }
}; 