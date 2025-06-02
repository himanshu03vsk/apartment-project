const AppDataSource = require('../../config/typeorm.config');
const Resident = require('../../entity/Resident');
const Person = require('../../entity/Person');
const Apartment = require('../../entity/Apartment');
const RentPayment = require('../../entity/RentPayment');
const Car = require('../../entity/Car');
const MaintenanceTicket = require('../../entity/MaintenanceTicket');
const Applicant = require('../../entity/Applicant');
const AppliesTo = require('../../entity/AppliesTo');
const FemaLetter = require('../../entity/FemaLetter');
const User = require('../../entity/User');

module.exports = {
    Query: {
        // Resident Queries
        resident: async (_, { residentSsn }) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .leftJoinAndSelect('resident.apartment', 'apartment')
                .where('resident.residentSsn = :residentSsn', { residentSsn })
                .getOne();
        },
        residents: async () => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .leftJoinAndSelect('resident.apartment', 'apartment')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },
        residentsByApartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .leftJoinAndSelect('resident.apartment', 'apartment')
                .where('resident.apartmentId = :apartmentId', { apartmentId })
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },

        // RentPayment Queries
        rentPayment: async (_, { residentSsn, paymentDate }) => {
            return await AppDataSource
                .getRepository(RentPayment)
                .createQueryBuilder('rentPayment')
                .leftJoinAndSelect('rentPayment.resident', 'resident')
                .where('rentPayment.residentSsn = :residentSsn', { residentSsn })
                .andWhere('rentPayment.paymentDate = :paymentDate', { paymentDate })
                .getOne();
        },
        rentPaymentsByResident: async (_, { residentSsn }) => {
            return await AppDataSource
                .getRepository(RentPayment)
                .createQueryBuilder('rentPayment')
                .leftJoinAndSelect('rentPayment.resident', 'resident')
                .where('rentPayment.residentSsn = :residentSsn', { residentSsn })
                .orderBy('rentPayment.paymentDate', 'DESC')
                .getMany();
        },

        // Applicant Queries
        applicant: async (_, { applicantSsn }) => {
            return await AppDataSource
                .getRepository(Applicant)
                .createQueryBuilder('applicant')
                .leftJoinAndSelect('applicant.person', 'person')
                .where('applicant.applicantSsn = :applicantSsn', { applicantSsn })
                .getOne();
        },
        applicants: async () => {
            return await AppDataSource
                .getRepository(Applicant)
                .createQueryBuilder('applicant')
                .leftJoinAndSelect('applicant.person', 'person')
                .orderBy('person.lastName', 'ASC')
                .addOrderBy('person.firstName', 'ASC')
                .getMany();
        },

        // Application Queries
        application: async (_, { applicantSsn, complexId }) => {
            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.applicant', 'applicant')
                .leftJoinAndSelect('appliesTo.complex', 'complex')
                .where('appliesTo.appSsn = :applicantSsn', { applicantSsn })
                .andWhere('appliesTo.complexId = :complexId', { complexId })
                .getOne();
        },
        applicationsByComplex: async (_, { complexId }) => {
            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.applicant', 'applicant')
                .leftJoinAndSelect('appliesTo.complex', 'complex')
                .where('appliesTo.complexId = :complexId', { complexId })
                .orderBy('appliesTo.applicationDate', 'DESC')
                .getMany();
        },
        applicationsByApplicant: async (_, { applicantSsn }) => {
            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.applicant', 'applicant')
                .leftJoinAndSelect('appliesTo.complex', 'complex')
                .where('appliesTo.appSsn = :applicantSsn', { applicantSsn })
                .orderBy('appliesTo.applicationDate', 'DESC')
                .getMany();
        },

        // User Queries
        user: async (_, { id }) => {
            return await AppDataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .where('user.id = :id', { id })
                .getOne();
        },
        users: async () => {
            return await AppDataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .orderBy('user.username', 'ASC')
                .getMany();
        },
        usersByRole: async (_, { role }) => {
            return await AppDataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .where('user.role = :role', { role })
                .orderBy('user.username', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        // Resident Mutations
        createResident: async (_, { input }) => {
            const resident = AppDataSource
                .getRepository(Resident)
                .create(input);
            
            return await AppDataSource
                .getRepository(Resident)
                .save(resident);
        },
        updateResident: async (_, { residentSsn, input }) => {
            await AppDataSource
                .getRepository(Resident)
                .update({ residentSsn }, input);

            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .leftJoinAndSelect('resident.apartment', 'apartment')
                .where('resident.residentSsn = :residentSsn', { residentSsn })
                .getOne();
        },
        deleteResident: async (_, { residentSsn }) => {
            const result = await AppDataSource
                .getRepository(Resident)
                .delete({ residentSsn });
            return result.affected > 0;
        },

        // RentPayment Mutations
        createRentPayment: async (_, { input }) => {
            const rentPayment = AppDataSource
                .getRepository(RentPayment)
                .create(input);
            
            return await AppDataSource
                .getRepository(RentPayment)
                .save(rentPayment);
        },

        // Applicant Mutations
        createApplicant: async (_, { input }) => {
            const applicant = AppDataSource
                .getRepository(Applicant)
                .create(input);
            
            return await AppDataSource
                .getRepository(Applicant)
                .save(applicant);
        },
        deleteApplicant: async (_, { applicantSsn }) => {
            const result = await AppDataSource
                .getRepository(Applicant)
                .delete({ applicantSsn });
            return result.affected > 0;
        },

        // Application Mutations
        createApplication: async (_, { input }) => {
            const application = AppDataSource
                .getRepository(AppliesTo)
                .create(input);
            
            return await AppDataSource
                .getRepository(AppliesTo)
                .save(application);
        },
        updateApplicationStatus: async (_, { applicantSsn, complexId, status }) => {
            await AppDataSource
                .getRepository(AppliesTo)
                .update(
                    { appSsn: applicantSsn, complexId },
                    { status }
                );

            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.applicant', 'applicant')
                .leftJoinAndSelect('appliesTo.complex', 'complex')
                .where('appliesTo.appSsn = :applicantSsn', { applicantSsn })
                .andWhere('appliesTo.complexId = :complexId', { complexId })
                .getOne();
        },
        deleteApplication: async (_, { applicantSsn, complexId }) => {
            const result = await AppDataSource
                .getRepository(AppliesTo)
                .delete({ 
                    appSsn: applicantSsn,
                    complexId 
                });
            return result.affected > 0;
        },

        // User Mutations
        createUser: async (_, { input }) => {
            const user = AppDataSource
                .getRepository(User)
                .create(input);
            
            return await AppDataSource
                .getRepository(User)
                .save(user);
        },
        updateUser: async (_, { id, input }) => {
            await AppDataSource
                .getRepository(User)
                .update({ id }, input);

            return await AppDataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .where('user.id = :id', { id })
                .getOne();
        },
        deleteUser: async (_, { id }) => {
            const result = await AppDataSource
                .getRepository(User)
                .delete({ id });
            return result.affected > 0;
        }
    },

    Resident: {
        person: async (resident) => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .where('person.ssn = :ssn', { ssn: resident.residentSsn })
                .getOne();
        },
        apartment: async (resident) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .where('apartment.aptId = :aptId', { aptId: resident.apartmentId })
                .getOne();
        },
        rentPayments: async (resident) => {
            return await AppDataSource
                .getRepository(RentPayment)
                .createQueryBuilder('rentPayment')
                .where('rentPayment.residentSsn = :residentSsn', { residentSsn: resident.residentSsn })
                .getMany();
        },
        maintenanceTickets: async (resident) => {
            return await AppDataSource
                .getRepository(MaintenanceTicket)
                .createQueryBuilder('maintenanceTicket')
                .where('maintenanceTicket.residentSsn = :residentSsn', { residentSsn: resident.residentSsn })
                .getMany();
        },
        cars: async (resident) => {
            return await AppDataSource
                .getRepository(Car)
                .createQueryBuilder('car')
                .where('car.residentSsn = :residentSsn', { residentSsn: resident.residentSsn })
                .getMany();
        }
    },

    Applicant: {
        person: async (applicant) => {
            return await AppDataSource
                .getRepository(Person)
                .createQueryBuilder('person')
                .where('person.ssn = :ssn', { ssn: applicant.applicantSsn })
                .getOne();
        },
        applications: async (applicant) => {
            return await AppDataSource
                .getRepository(AppliesTo)
                .createQueryBuilder('appliesTo')
                .leftJoinAndSelect('appliesTo.complex', 'complex')
                .where('appliesTo.appSsn = :applicantSsn', { applicantSsn: applicant.applicantSsn })
                .getMany();
        }
    },

    AppliesTo: {
        applicant: async (appliesTo) => {
            return await AppDataSource
                .getRepository(Applicant)
                .createQueryBuilder('applicant')
                .leftJoinAndSelect('applicant.person', 'person')
                .where('applicant.applicantSsn = :applicantSsn', { applicantSsn: appliesTo.appSsn })
                .getOne();
        },
        complex: async (appliesTo) => {
            return await AppDataSource
                .getRepository('Complex')
                .createQueryBuilder('complex')
                .where('complex.cid = :cid', { cid: appliesTo.complexId })
                .getOne();
        }
    }
}; 