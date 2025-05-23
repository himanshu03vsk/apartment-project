const { EntitySchema } = require("typeorm");

const Amenity = new EntitySchema({
    name: "Amenity",
    tableName: "FALL24_S003_T5_AMENITY",
    schema: "",
    synchronize: false,
    quoted: false,
    columns: {
        amenityType: {
            primary: true,
            type: "varchar",
            length: 100,
            name: "AMENITY_TYPE",
            quoted: false
        }
    }
});

module.exports = Amenity;
