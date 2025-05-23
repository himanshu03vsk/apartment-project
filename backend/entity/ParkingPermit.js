const { EntitySchema } = require("typeorm");
const Resident = require("./Resident");
const Car = require("./Car");
const ParkingSpot = require("./ParkingSpot");

const ParkingPermit = new EntitySchema({
    name: "ParkingPermit",
    tableName: "FALL24_S003_T5_PARKINGPERMIT",
    columns: {
        residentSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "RESIDENT_SSN"
        },
        licensePlate: {
            primary: true,
            type: "varchar",
            length: 8,
            name: "LICENSE_PLATE"
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
        assignedLotNo: {
            type: "char",
            length: 1,
            name: "ASSIGNED_LOT_NO",
            nullable: false
        },
        assignedComplexId: {
            type: "char",
            length: 12,
            name: "ASSIGNED_COMPLEX_ID",
            nullable: false
        },
        assignedSpotNo: {
            type: "varchar",
            length: 2,
            name: "ASSIGNED_SPOT_NO",
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
        car: {
            type: "many-to-one",
            target: "Car",
            joinColumn: {
                name: "LICENSE_PLATE",
                referencedColumnName: "licensePlate"
            }
        },
        parkingSpot: {
            type: "many-to-one",
            target: "ParkingSpot",
            joinColumn: [
                { name: "ASSIGNED_LOT_NO", referencedColumnName: "parentLotNo" },
                { name: "ASSIGNED_COMPLEX_ID", referencedColumnName: "parentComplexId" },
                { name: "ASSIGNED_SPOT_NO", referencedColumnName: "spotNo" }
            ],
            onDelete: "CASCADE"
        }
    }
});

module.exports = ParkingPermit;
