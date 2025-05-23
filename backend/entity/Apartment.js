const { EntitySchema } = require("typeorm");
const Building = require("./Building");

const Apartment = new EntitySchema({
    name: "Apartment",
    tableName: "FALL24_S003_T5_APARTMENT",
    columns: {
        aid: {
            primary: true,
            type: "varchar",
            length: 30,
            name: "AID",
            generated: "ALWAYS"
        },
        aptNo: {
            type: "integer",
            name: "APT_NO",
            nullable: false
        },
        floorNo: {
            type: "integer",
            name: "FLOOR_NO",
            nullable: false
        },
        numOfBedrooms: {
            type: "integer",
            name: "NUM_OF_BEDROOMS",
            nullable: false
        },
        numOfBathrooms: {
            type: "integer",
            name: "NUM_OF_BATHROOMS",
            nullable: false
        },
        totalSqft: {
            type: "float",
            name: "TOTAL_SQFT",
            nullable: false
        },
        petFriendly: {
            type: "char",
            length: 1,
            name: "PET_FRIENDLY",
            nullable: false,
            enum: ['Y', 'N']
        },
        smoking: {
            type: "char",
            length: 1,
            name: "SMOKING",
            nullable: false,
            enum: ['Y', 'N']
        },
        furnished: {
            type: "char",
            length: 1,
            name: "FURNISHED",
            nullable: false,
            enum: ['Y', 'N']
        },
        rent: {
            type: "integer",
            name: "RENT",
            nullable: false
        },
        buildingId: {
            type: "varchar",
            length: 20,
            name: "BUILDING_ID",
            nullable: false
        }
    },
    relations: {
        building: {
            type: "many-to-one",
            target: "Building",
            joinColumn: {
                name: "BUILDING_ID",
                referencedColumnName: "bid"
            },
            onDelete: "CASCADE"
        },
        residents: {
            type: "one-to-many",
            target: "Resident",
            inverseSide: "apartment"
        },
        maintenanceTickets: {
            type: "one-to-many",
            target: "MaintenanceTicket",
            inverseSide: "apartment"
        }
    }
});

module.exports = Apartment;
