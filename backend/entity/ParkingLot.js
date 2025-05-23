const { EntitySchema } = require("typeorm");

const ParkingLot = new EntitySchema({
    name: "ParkingLot",
    tableName: "FALL24_S003_T5_PARKINGLOT",
    columns: {
        lotNo: {
            primary: true,
            type: "char",
            length: 1,
            name: "LOT_NO"
        },
        complexId: {
            primary: true,
            type: "char",
            length: 12,
            name: "COMPLEX_ID"
        }
    },
    relations: {
        complex: {
            type: "many-to-one",
            target: "Complex",
            joinColumn: {
                name: "COMPLEX_ID",
                referencedColumnName: "cid"
            },
            onDelete: "CASCADE"
        },
        parkingSpots: {
            type: "one-to-many",
            target: "ParkingSpot",
            inverseSide: "parkingLot"
        }
    }
});

module.exports = ParkingLot;
