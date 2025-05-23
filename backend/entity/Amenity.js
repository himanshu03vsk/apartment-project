const { Entity, Column, PrimaryColumn } = require("typeorm");

@Entity("Fall24_S003_T5_Amenity")
class Amenity {
    @PrimaryColumn({
        type: "varchar",
        length: 100,
        name: "Amenity_type"
    })
    amenityType;

    // You might want to add methods or additional properties here
}

module.exports = Amenity;
