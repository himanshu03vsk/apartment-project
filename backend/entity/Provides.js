const { EntitySchema } = require("typeorm");

const Provides = new EntitySchema({
    name: "Provides",
    tableName: "FALL24_S003_T5_PROVIDES",
    columns: {
        complexId: {
            primary: true,
            type: "char",
            length: 12,
            name: "COMPLEX_ID"
        },
        amenType: {
            primary: true,
            type: "varchar",
            length: 100,
            name: "AMEN_TYPE"
        },
        quantity: {
            type: "char",
            length: 10,
            name: "QUANTITY",
            nullable: true
        },
        description: {
            type: "varchar",
            length: 100,
            name: "DESCRIPTION",
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
        amenity: {
            type: "many-to-one",
            target: "Amenity",
            joinColumn: {
                name: "AMEN_TYPE",
                referencedColumnName: "amenityType"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = Provides;
