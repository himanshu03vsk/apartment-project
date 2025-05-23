const { EntitySchema } = require("typeorm");

const ParkingSpot = new EntitySchema({
    name: "ParkingSpot",
    tableName: "FALL24_S003_T5_PARKINGSPOT",
    columns: {
        parentLotNo: {
            primary: true,
            type: "char",
            length: 1,
            name: "PARENT_LOT_NO"
        },
        parentComplexId: {
            primary: true,
            type: "char",
            length: 12,
            name: "PARENT_COMPLEX_ID"
        },
        spotNo: {
            primary: true,
            type: "varchar",
            length: 2,
            name: "SPOT_NO"
        },
        occupancy: {
            type: "char",
            length: 1,
            name: "OCCUPANCY",
            nullable: false
        },
        parkingType: {
            type: "varchar",
            length: 20,
            name: "PARKING_TYPE",
            nullable: false,
            enum: ['Covered', 'Uncovered', 'Garage', 'Handicap']
        }
    },
    relations: {
        parkingLot: {
            type: "many-to-one",
            target: "ParkingLot",
            joinColumn: [
                { name: "PARENT_LOT_NO", referencedColumnName: "lotNo" },
                { name: "PARENT_COMPLEX_ID", referencedColumnName: "complexId" }
            ],
            onDelete: "CASCADE"
        },
        parkingPermits: {
            type: "one-to-many",
            target: "ParkingPermit",
            inverseSide: "parkingSpot"
        }
    }
});

module.exports = ParkingSpot;
