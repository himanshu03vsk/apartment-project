const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Complex = require("./Complex");

@Entity("Fall24_S003_T5_Building")
class Building {
    @PrimaryColumn({
        type: "varchar",
        name: "Bid",
        generated: "ALWAYS"
    })
    bid;

    @Column({
        type: "integer",
        name: "Building_no",
        nullable: false
    })
    buildingNo;

    @Column({
        type: "integer",
        name: "Num_of_floors",
        nullable: false
    })
    numOfFloors;

    @Column({
        type: "char",
        length: 12,
        name: "Complex_id",
        nullable: false
    })
    complexId;

    @ManyToOne(() => Complex, complex => complex.buildings, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Complex_id", referencedColumnName: "cid" })
    complex;

    @OneToMany(() => FemaLetter, femaLetter => femaLetter.building)
    femaLetters;

    @OneToMany(() => Apartment, apartment => apartment.building)
    apartments;
}

module.exports = Building;
