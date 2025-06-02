const AppDataSource = require('../../config/typeorm.config');
const ParkingLot = require('../../entity/ParkingLot');
const ParkingSpot = require('../../entity/ParkingSpot');
const ParkingPermit = require('../../entity/ParkingPermit');
const Car = require('../../entity/Car');
const Complex = require('../../entity/Complex');
const Resident = require('../../entity/Resident');

module.exports = {
    Query: {
        parkingLot: async (_, { lotId }) => {
            return await AppDataSource
                .getRepository(ParkingLot)
                .createQueryBuilder('parkingLot')
                .leftJoinAndSelect('parkingLot.complex', 'complex')
                .where('parkingLot.lotId = :lotId', { lotId })
                .getOne();
        },
        parkingLots: async () => {
            return await AppDataSource
                .getRepository(ParkingLot)
                .createQueryBuilder('parkingLot')
                .leftJoinAndSelect('parkingLot.complex', 'complex')
                .getMany();
        },
        parkingSpot: async (_, { spotId }) => {
            return await AppDataSource
                .getRepository(ParkingSpot)
                .createQueryBuilder('parkingSpot')
                .leftJoinAndSelect('parkingSpot.parkingLot', 'parkingLot')
                .where('parkingSpot.spotId = :spotId', { spotId })
                .getOne();
        },
        parkingSpotsByLot: async (_, { lotId }) => {
            return await AppDataSource
                .getRepository(ParkingSpot)
                .createQueryBuilder('parkingSpot')
                .leftJoinAndSelect('parkingSpot.parkingLot', 'parkingLot')
                .where('parkingSpot.lotId = :lotId', { lotId })
                .getMany();
        },
        parkingPermit: async (_, { permitId }) => {
            return await AppDataSource
                .getRepository(ParkingPermit)
                .createQueryBuilder('parkingPermit')
                .leftJoinAndSelect('parkingPermit.car', 'car')
                .leftJoinAndSelect('parkingPermit.parkingSpot', 'parkingSpot')
                .where('parkingPermit.permitId = :permitId', { permitId })
                .getOne();
        },
        parkingPermitsByResident: async (_, { residentSsn }) => {
            const cars = await AppDataSource
                .getRepository(Car)
                .createQueryBuilder('car')
                .leftJoinAndSelect('car.parkingPermits', 'parkingPermits')
                .where('car.residentSsn = :residentSsn', { residentSsn })
                .getMany();
            return cars.flatMap(car => car.parkingPermits);
        }
    },

    Mutation: {
        createParkingLot: async (_, { input }) => {
            const parkingLotRepository = AppDataSource.getRepository(ParkingLot);
            const parkingLot = parkingLotRepository.create(input);
            return await parkingLotRepository.save(parkingLot);
        },
        createParkingSpot: async (_, { input }) => {
            const parkingSpotRepository = AppDataSource.getRepository(ParkingSpot);
            const parkingSpot = parkingSpotRepository.create(input);
            return await parkingSpotRepository.save(parkingSpot);
        },
        createParkingPermit: async (_, { input }) => {
            const parkingPermitRepository = AppDataSource.getRepository(ParkingPermit);
            const parkingPermit = parkingPermitRepository.create(input);
            return await parkingPermitRepository.save(parkingPermit);
        },
        updateParkingSpot: async (_, { spotId, input }) => {
            const parkingSpotRepository = AppDataSource.getRepository(ParkingSpot);
            await parkingSpotRepository.update({ spotId }, input);
            return await parkingSpotRepository
                .createQueryBuilder('parkingSpot')
                .leftJoinAndSelect('parkingSpot.parkingLot', 'parkingLot')
                .where('parkingSpot.spotId = :spotId', { spotId })
                .getOne();
        },
        deleteParkingPermit: async (_, { permitId }) => {
            const result = await AppDataSource
                .getRepository(ParkingPermit)
                .delete({ permitId });
            return result.affected > 0;
        }
    },

    ParkingLot: {
        complex: async (parkingLot) => {
            return await AppDataSource
                .getRepository(Complex)
                .createQueryBuilder('complex')
                .where('complex.cid = :cid', { cid: parkingLot.complexId })
                .getOne();
        },
        spots: async (parkingLot) => {
            return await AppDataSource
                .getRepository(ParkingSpot)
                .createQueryBuilder('parkingSpot')
                .where('parkingSpot.lotId = :lotId', { lotId: parkingLot.lotId })
                .getMany();
        }
    },

    ParkingSpot: {
        parkingLot: async (parkingSpot) => {
            return await AppDataSource
                .getRepository(ParkingLot)
                .createQueryBuilder('parkingLot')
                .where('parkingLot.lotId = :lotId', { lotId: parkingSpot.lotId })
                .getOne();
        },
        currentPermit: async (parkingSpot) => {
            return await AppDataSource
                .getRepository(ParkingPermit)
                .createQueryBuilder('parkingPermit')
                .leftJoinAndSelect('parkingPermit.car', 'car')
                .where('parkingPermit.spotId = :spotId', { spotId: parkingSpot.spotId })
                .getOne();
        }
    },

    ParkingPermit: {
        car: async (parkingPermit) => {
            return await AppDataSource
                .getRepository(Car)
                .createQueryBuilder('car')
                .leftJoinAndSelect('car.resident', 'resident')
                .where('car.licensePlate = :licensePlate', { licensePlate: parkingPermit.licensePlate })
                .getOne();
        },
        parkingSpot: async (parkingPermit) => {
            return await AppDataSource
                .getRepository(ParkingSpot)
                .createQueryBuilder('parkingSpot')
                .where('parkingSpot.spotId = :spotId', { spotId: parkingPermit.spotId })
                .getOne();
        }
    },

    Car: {
        resident: async (car) => {
            return await AppDataSource
                .getRepository(Resident)
                .createQueryBuilder('resident')
                .leftJoinAndSelect('resident.person', 'person')
                .where('resident.residentSsn = :residentSsn', { residentSsn: car.residentSsn })
                .getOne();
        },
        parkingPermits: async (car) => {
            return await AppDataSource
                .getRepository(ParkingPermit)
                .createQueryBuilder('parkingPermit')
                .where('parkingPermit.licensePlate = :licensePlate', { licensePlate: car.licensePlate })
                .getMany();
        }
    }
}; 