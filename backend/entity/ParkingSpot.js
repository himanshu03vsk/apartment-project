const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const ParkingLot = require("./ParkingLot");

@Entity("Fall24_S003_T5_ParkingSpot")
class ParkingSpot {
    @PrimaryColumn({
        type: "char",
        length: 1,
        name: "Parent_lot_no"
    })
    parentLotNo;

    @PrimaryColumn({
        type: "char",
        length: 12,
        name: "Parent_complex_id"
    })
    parentComplexId;

    @PrimaryColumn({
        type: "varchar",
        length: 2,
        name: "Spot_no"
    })
    spotNo;

    @Column({
        type: "char",
        length: 1,
        name: "Occupancy",
        nullable: false
    })
    occupancy;

    @Column({
        type: "varchar",
        length: 20,
        name: "Parking_type",
        nullable: false,
        enum: ['Covered', 'Uncovered', 'Garage', 'Handicap']
    })
    parkingType;

    @ManyToOne(() => ParkingLot, parkingLot => parkingLot.parkingSpots, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "Parent_lot_no", referencedColumnName: "lotNo" },
        { name: "Parent_complex_id", referencedColumnName: "complexId" }
    ])
    parkingLot;

    @OneToMany(() => ParkingPermit, parkingPermit => parkingPermit.parkingSpot)
    parkingPermits;
}

module.exports = ParkingSpot;
