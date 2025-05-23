const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Complex = require("./Complex");
const Amenity = require("./Amenity");

@Entity("Fall24_S003_T5_Provides")
class Provides {
    @PrimaryColumn({
        type: "char",
        length: 12,
        name: "Complex_id"
    })
    complexId;

    @PrimaryColumn({
        type: "varchar",
        length: 100,
        name: "Amen_type"
    })
    amenType;

    @Column({
        type: "char",
        length: 10,
        name: "Quantity",
        nullable: true
    })
    quantity;

    @Column({
        type: "varchar",
        length: 100,
        name: "Description",
        nullable: false
    })
    description;

    @ManyToOne(() => Complex, complex => complex.amenities, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Complex_id", referencedColumnName: "cid" })
    complex;

    @ManyToOne(() => Amenity, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Amen_type", referencedColumnName: "amenityType" })
    amenity;
}

module.exports = Provides;
