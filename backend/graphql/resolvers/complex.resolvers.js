const AppDataSource = require('../../config/typeorm.config');
const Complex = require('../../entity/Complex');
const Employee = require('../../entity/Employee');
const Provides = require('../../entity/Provides');
const Amenity = require('../../entity/Amenity');
const Building = require('../../entity/Building');
const ParkingLot = require('../../entity/ParkingLot');
const AppliesTo = require('../../entity/AppliesTo');

module.exports = {
    Query: {
        complex: async (_, { cid }) => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .leftJoinAndSelect('complex.manager', 'manager')
                .leftJoinAndSelect('manager.person', 'managerPerson')
                .where('complex.cid = :cid', { cid })
                .getOne();
        },
        complexes: async () => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .leftJoinAndSelect('complex.manager', 'manager')
                .leftJoinAndSelect('manager.person', 'managerPerson')
                .orderBy('complex.name', 'ASC')
                .getMany();
        },
        complexAmenities: async (_, { complexId }) => {
            return await AppDataSource
                .getRepository(Provides)
                .createQueryBuilder('provides')
                .leftJoinAndSelect('provides.complex', 'complex')
                .leftJoinAndSelect('provides.amenity', 'amenity')
                .where('provides.complexId = :complexId', { complexId })
                .orderBy('amenity.name', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createComplex: async (_, { input }) => {
            const complex = AppDataSource
                .getRepository(Complex)
                .create(input);
            
            return await AppDataSource
                .getRepository(Complex)
                .save(complex);
        },
        updateComplex: async (_, { cid, input }) => {
            await AppDataSource
                .getRepository(Complex)
                .update({ cid }, input);

            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .leftJoinAndSelect('complex.manager', 'manager')
                .leftJoinAndSelect('manager.person', 'managerPerson')
                .where('complex.cid = :cid', { cid })
                .getOne();
        },
        deleteComplex: async (_, { cid }) => {
            const result = await AppDataSource
                .getRepository(Complex)
                .delete({ cid });
            return result.affected > 0;
        },
        addAmenityToComplex: async (_, { input }) => {
            const provides = AppDataSource
                .getRepository(Provides)
                .create(input);
            
            return await AppDataSource
                .getRepository(Provides)
                .save(provides);
        },
        removeAmenityFromComplex: async (_, { complexId, amenType }) => {
            const result = await AppDataSource
                .getRepository(Provides)
                .delete({ complexId, amenType });
            return result.affected > 0;
        }
    },

    Complex: {
        manager: async (complex) => {
            if (!complex.mgrSsn) return null;
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .where('employee.empSsn = :mgrSsn', { mgrSsn: complex.mgrSsn })
                .getOne();
        },
        employees: async (complex) => {
            return await AppDataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .leftJoinAndSelect('employee.person', 'person')
                .where('employee.complexId = :cid', { cid: complex.cid })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        amenities: async (complex) => {
            return await AppDataSource
                .getRepository(Provides)
                .createQueryBuilder('provides')
                .leftJoinAndSelect('provides.amenity', 'amenity')
                .where('provides.complexId = :cid', { cid: complex.cid })
                .orderBy('amenity.name', 'ASC')
                .getMany();
        },
        buildings: async (complex) => {
            return await AppDataSource
                .getRepository(Building)
                .createQueryBuilder('building')
                .leftJoinAndSelect('building.apartments', 'apartments')
                .where('building.complexId = :cid', { cid: complex.cid })
                .orderBy('building.buildingNumber', 'ASC')
                .getMany();
        },
        parkingLots: async (complex) => {
            return await AppDataSource
                .getRepository(ParkingLot)
                .createQueryBuilder('parkingLot')
                .leftJoinAndSelect('parkingLot.spots', 'spots')
                .where('parkingLot.complexId = :cid', { cid: complex.cid })
                .orderBy('parkingLot.name', 'ASC')
                .getMany();
        },
        applications: async (complex) => {
            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.applicant', 'applicant')
                .leftJoinAndSelect('applicant.person', 'person')
                .where('appliesTo.complexId = :cid', { cid: complex.cid })
                .orderBy('appliesTo.applicationDate', 'DESC')
                .getMany();
        }
    }
};
