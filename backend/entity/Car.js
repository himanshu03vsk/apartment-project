const { EntitySchema } = require("typeorm");

const Car = new EntitySchema({
    name: "Car",
    tableName: "FALL24_S003_T5_CAR",
    columns: {
        licensePlate: {
            primary: true,
            type: "varchar",
            length: 8,
            name: "LICENSE_PLATE"
        },
        make: {
            type: "varchar",
            length: 25,
            name: "MAKE",
            nullable: true
        },
        model: {
            type: "varchar",
            length: 25,
            name: "MODEL",
            nullable: true
        },
        year: {
            type: "char",
            length: 4,
            name: "YEAR",
            nullable: true
        },
        residentSsn: {
            type: "char",
            length: 9,
            name: "RESIDENT_SSN",
            nullable: false
        }
    },
    relations: {
        resident: {
            type: "many-to-one",
            target: "Resident",
            joinColumn: {
                name: "RESIDENT_SSN",
                referencedColumnName: "resSsn"
            },
            onDelete: "CASCADE"
        },
        parkingPermits: {
            type: "one-to-many",
            target: "ParkingPermit",
            inverseSide: "car"
        }
    }
});

module.exports = Car;
