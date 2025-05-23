const { AppDataSource } = require('../../config/data-source');

const personResolvers = {
  Query: {
    person: async (_, { ssn }) => {
      const personRepository = AppDataSource.getRepository('Person');
      return await personRepository.findOne({ 
        where: { ssn },
        relations: ['applicants', 'employees', 'residents']
      });
    },
    people: async () => {
      const personRepository = AppDataSource.getRepository('Person');
      return await personRepository.find({
        relations: ['applicants', 'employees', 'residents']
      });
    },
    searchPeople: async (_, { searchTerm }) => {
      const personRepository = AppDataSource.getRepository('Person');
      return await personRepository
        .createQueryBuilder('person')
        .where('LOWER(person.fname) LIKE LOWER(:searchTerm)', { searchTerm: `%${searchTerm}%` })
        .orWhere('LOWER(person.lname) LIKE LOWER(:searchTerm)', { searchTerm: `%${searchTerm}%` })
        .getMany();
    },
  },
  Mutation: {
    createPerson: async (_, { input }) => {
      const personRepository = AppDataSource.getRepository('Person');
      const person = personRepository.create(input);
      return await personRepository.save(person);
    },
    updatePerson: async (_, { ssn, input }) => {
      const personRepository = AppDataSource.getRepository('Person');
      await personRepository.update({ ssn }, input);
      return await personRepository.findOne({ where: { ssn } });
    },
    deletePerson: async (_, { ssn }) => {
      const personRepository = AppDataSource.getRepository('Person');
      const result = await personRepository.delete({ ssn });
      return result.affected > 0;
    },
  },
};

module.exports = personResolvers; 