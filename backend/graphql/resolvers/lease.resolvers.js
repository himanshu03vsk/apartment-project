const AppDataSource = require('../../config/typeorm.config');
const Lease = require('../../entity/Lease');
const Apartment = require('../../entity/Apartment');
const Resident = require('../../entity/Resident');
const Payment = require('../../entity/Payment');

module.exports = {
    Query: {
        lease: async (_, { leaseId }) => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.leaseId = :leaseId', { leaseId })
                .getOne();
        },
        leases: async () => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .orderBy('lease.startDate', 'DESC')
                .getMany();
        },
        activeLeases: async () => {
            const currentDate = new Date();
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.startDate <= :currentDate', { currentDate })
                .andWhere('lease.endDate >= :currentDate', { currentDate })
                .orderBy('lease.startDate', 'DESC')
                .getMany();
        },
        leasesByApartment: async (_, { apartmentId }) => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.apartmentId = :apartmentId', { apartmentId })
                .orderBy('lease.startDate', 'DESC')
                .getMany();
        },
        leasesByResident: async (_, { residentSsn }) => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.residentSsn = :residentSsn', { residentSsn })
                .orderBy('lease.startDate', 'DESC')
                .getMany();
        }
    },

    Mutation: {
        createLease: async (_, { input }) => {
            const leaseRepository = AppDataSource.getRepository(Lease);
            const lease = leaseRepository.create({
                ...input,
                status: 'ACTIVE',
                dateCreated: new Date()
            });
            return await leaseRepository.save(lease);
        },
        updateLease: async (_, { leaseId, input }) => {
            await AppDataSource
                .getRepository(Lease)
                .update({ leaseId }, input);

            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.leaseId = :leaseId', { leaseId })
                .getOne();
        },
        terminateLease: async (_, { leaseId, terminationReason }) => {
            await AppDataSource
                .getRepository(Lease)
                .update({ leaseId }, {
                    status: 'TERMINATED',
                    endDate: new Date(),
                    terminationReason
                });

            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.leaseId = :leaseId', { leaseId })
                .getOne();
        },
        renewLease: async (_, { leaseId, newEndDate, newRent }) => {
            const oldLease = await AppDataSource
                .getRepository(Lease)
                .findOne({ where: { leaseId } });

            const leaseRepository = AppDataSource.getRepository(Lease);
            const newLease = leaseRepository.create({
                ...oldLease,
                leaseId: undefined, // Let Oracle generate new ID
                startDate: oldLease.endDate,
                endDate: newEndDate,
                monthlyRent: newRent || oldLease.monthlyRent,
                status: 'ACTIVE',
                dateCreated: new Date(),
                previousLeaseId: leaseId
            });

            await leaseRepository.save(newLease);

            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .leftJoinAndSelect('lease.payments', 'payments')
                .where('lease.leaseId = :leaseId', { leaseId: newLease.leaseId })
                .getOne();
        }
    },

    Lease: {
        apartment: async (lease) => {
            return await AppDataSource
                .getRepository(Apartment)
                .createQueryBuilder('apartment')
                .leftJoinAndSelect('apartment.complex', 'complex')
                .where('apartment.apartmentId = :apartmentId', { apartmentId: lease.apartmentId })
                .getOne();
        },
        resident: async (lease) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.residentSsn = :residentSsn', { residentSsn: lease.residentSsn })
                .getOne();
        },
        payments: async (lease) => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .where('payment.leaseId = :leaseId', { leaseId: lease.leaseId })
                .orderBy('payment.paymentDate', 'DESC')
                .getMany();
        },
        previousLease: async (lease) => {
            if (!lease.previousLeaseId) return null;
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('lease.leaseId = :leaseId', { leaseId: lease.previousLeaseId })
                .getOne();
        }
    }
}; 