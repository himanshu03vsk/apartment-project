const { EntitySchema } = require("typeorm");

const Complex = new EntitySchema({
    name: "Complex",
    tableName: "FALL24_S003_T5_COMPLEX",
    columns: {
        cid: {
            primary: true,
            type: "char",
            length: 12,
            name: "CID"
        },
        complexName: {
            type: "varchar",
            length: 25,
            name: "COMPLEX_NAME",
            nullable: false
        },
        street: {
            type: "varchar",
            length: 25,
            name: "STREET",
            nullable: false
        },
        city: {
            type: "varchar",
            length: 25,
            name: "CITY",
            nullable: false
        },
        state: {
            type: "char",
            length: 2,
            name: "STATE",
            nullable: false
        },
        zip: {
            type: "char",
            length: 5,
            name: "ZIP",
            nullable: false
        },
        mgrSsn: {
            type: "char",
            length: 9,
            name: "MGR_SSN",
            nullable: true
        }
    },
    relations: {
        manager: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "MGR_SSN",
                referencedColumnName: "empSsn"
            }
        },
        employees: {
            type: "one-to-many",
            target: "Employee",
            inverseSide: "complex"
        },
        amenities: {
            type: "one-to-many",
            target: "Provides",
            inverseSide: "complex"
        },
        buildings: {
            type: "one-to-many",
            target: "Building",
            inverseSide: "complex"
        },
        parkingLots: {
            type: "one-to-many",
            target: "ParkingLot",
            inverseSide: "complex"
        },
        applications: {
            type: "one-to-many",
            target: "AppliesTo",
            inverseSide: "complex"
        }
    }
});

module.exports = Complex;
