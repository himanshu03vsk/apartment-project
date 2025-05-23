const { EntitySchema } = require("typeorm");
const Person = require("./Person");
const Apartment = require("./Apartment");

const Resident = new EntitySchema({
    name: "Resident",
    tableName: "FALL24_S003_T5_RESIDENT",
    columns: {
        resSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "RES_SSN"
        },
        startDate: {
            type: "date",
            name: "START_DATE",
            nullable: false
        },
        endDate: {
            type: "date",
            name: "END_DATE",
            nullable: false
        },
        aptId: {
            type: "varchar",
            length: 30,
            name: "APT_ID",
            nullable: false
        }
    },
    relations: {
        person: {
            type: "many-to-one",
            target: "Person",
            joinColumn: {
                name: "RES_SSN",
                referencedColumnName: "ssn"
            },
            onDelete: "CASCADE"
        },
        apartment: {
            type: "many-to-one",
            target: "Apartment",
            joinColumn: {
                name: "APT_ID",
                referencedColumnName: "aid"
            },
            onDelete: "CASCADE"
        },
        cars: {
            type: "one-to-many",
            target: "Car",
            inverseSide: "resident"
        },
        parkingPermits: {
            type: "one-to-many",
            target: "ParkingPermit",
            inverseSide: "resident"
        },
        rentPayments: {
            type: "one-to-many",
            target: "RentPayment",
            inverseSide: "resident"
        },
        maintenanceTickets: {
            type: "one-to-many",
            target: "MaintenanceTicket",
            inverseSide: "resident"
        },
        maintenanceWork: {
            type: "one-to-many",
            target: "WorksOn",
            inverseSide: "resident"
        }
    }
});

module.exports = Resident;
