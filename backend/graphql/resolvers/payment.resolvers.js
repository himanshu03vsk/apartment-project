const AppDataSource = require('../../config/typeorm.config');
const Payment = require('../../entity/Payment');
const Lease = require('../../entity/Lease');
const Resident = require('../../entity/Resident');

module.exports = {
    Query: {
        payment: async (_, { paymentId }) => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.paymentId = :paymentId', { paymentId })
                .getOne();
        },
        payments: async () => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .orderBy('payment.paymentDate', 'DESC')
                .getMany();
        },
        paymentsByLease: async (_, { leaseId }) => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.leaseId = :leaseId', { leaseId })
                .orderBy('payment.paymentDate', 'DESC')
                .getMany();
        },
        paymentsByResident: async (_, { residentSsn }) => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('lease.residentSsn = :residentSsn', { residentSsn })
                .orderBy('payment.paymentDate', 'DESC')
                .getMany();
        },
        paymentsByDateRange: async (_, { startDate, endDate }) => {
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.paymentDate >= :startDate', { startDate })
                .andWhere('payment.paymentDate <= :endDate', { endDate })
                .orderBy('payment.paymentDate', 'DESC')
                .getMany();
        },
        overduePayments: async () => {
            const currentDate = new Date();
            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.dueDate < :currentDate', { currentDate })
                .andWhere('payment.status = :status', { status: 'PENDING' })
                .orderBy('payment.dueDate', 'ASC')
                .getMany();
        }
    },

    Mutation: {
        createPayment: async (_, { input }) => {
            const paymentRepository = AppDataSource.getRepository(Payment);
            const payment = paymentRepository.create({
                ...input,
                paymentDate: new Date(),
                status: 'COMPLETED'
            });
            return await paymentRepository.save(payment);
        },
        updatePayment: async (_, { paymentId, input }) => {
            await AppDataSource
                .getRepository(Payment)
                .update({ paymentId }, input);

            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.paymentId = :paymentId', { paymentId })
                .getOne();
        },
        recordPayment: async (_, { leaseId, amount, paymentMethod, notes }) => {
            const lease = await AppDataSource
                .getRepository(Lease)
                .findOne({ where: { leaseId } });

            const paymentRepository = AppDataSource.getRepository(Payment);
            const payment = paymentRepository.create({
                leaseId,
                amount,
                paymentMethod,
                notes,
                paymentDate: new Date(),
                status: 'COMPLETED',
                paymentType: amount === lease.monthlyRent ? 'RENT' : 'OTHER'
            });

            await paymentRepository.save(payment);

            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.paymentId = :paymentId', { paymentId: payment.paymentId })
                .getOne();
        },
        voidPayment: async (_, { paymentId, reason }) => {
            await AppDataSource
                .getRepository(Payment)
                .update({ paymentId }, {
                    status: 'VOID',
                    notes: reason
                });

            return await AppDataSource
                .getRepository(Payment)
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.lease', 'lease')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('payment.paymentId = :paymentId', { paymentId })
                .getOne();
        }
    },

    Payment: {
        lease: async (payment) => {
            return await AppDataSource
                .getRepository(Lease)
                .createQueryBuilder('lease')
                .leftJoinAndSelect('lease.apartment', 'apartment')
                .leftJoinAndSelect('lease.resident', 'resident')
                .where('lease.leaseId = :leaseId', { leaseId: payment.leaseId })
                .getOne();
        },
        resident: async (payment) => {
            const lease = await AppDataSource
                .getRepository(Lease)
                .findOne({ where: { leaseId: payment.leaseId } });

            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.residentSsn = :residentSsn', { residentSsn: lease.residentSsn })
                .getOne();
        }
    }
}; 