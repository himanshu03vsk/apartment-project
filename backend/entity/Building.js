const { EntitySchema } = require("typeorm");

const Building = new EntitySchema({
    name: "Building",
    tableName: "FALL24_S003_T5_BUILDING",
    columns: {
        bid: {
            primary: true,
            type: "varchar",
            name: "BID",
            generated: "ALWAYS"
        },
        buildingNo: {
            type: "integer",
            name: "BUILDING_NO",
            nullable: false
        },
        numOfFloors: {
            type: "integer",
            name: "NUM_OF_FLOORS",
            nullable: false
        },
        complexId: {
            type: "char",
            length: 12,
            name: "COMPLEX_ID",
            nullable: false
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
        femaLetters: {
            type: "one-to-many",
            target: "FemaLetter",
            inverseSide: "building"
        },
        apartments: {
            type: "one-to-many",
            target: "Apartment",
            inverseSide: "building"
        }
    }
});

module.exports = Building;
