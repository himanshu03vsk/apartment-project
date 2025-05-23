const { Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Complex = require("./Complex");

@Entity("Fall24_S003_T5_ParkingLot")
class ParkingLot {
    @PrimaryColumn({
        type: "char",
        length: 1,
        name: "Lot_no"
    })
    lotNo;

    @PrimaryColumn({
        type: "char",
        length: 12,
        name: "Complex_id"
    })
    complexId;

    @ManyToOne(() => Complex, complex => complex.parkingLots, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Complex_id", referencedColumnName: "cid" })
    complex;

    @OneToMany(() => ParkingSpot, parkingSpot => parkingSpot.parkingLot)
    parkingSpots;
}

module.exports = ParkingLot;
