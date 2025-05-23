const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Resident = require("./Resident");
const Car = require("./Car");
const ParkingSpot = require("./ParkingSpot");

@Entity("Fall24_S003_T5_ParkingPermit")
class ParkingPermit {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Resident_ssn"
    })
    residentSsn;

    @PrimaryColumn({
        type: "varchar",
        length: 8,
        name: "License_plate"
    })
    licensePlate;

    @Column({
        type: "date",
        name: "Start_date",
        nullable: false
    })
    startDate;

    @Column({
        type: "date",
        name: "End_date",
        nullable: false
    })
    endDate;

    @Column({
        type: "char",
        length: 1,
        name: "Assigned_lot_no",
        nullable: false
    })
    assignedLotNo;

    @Column({
        type: "char",
        length: 12,
        name: "Assigned_complex_id",
        nullable: false
    })
    assignedComplexId;

    @Column({
        type: "varchar",
        length: 2,
        name: "Assigned_spot_no",
        nullable: false
    })
    assignedSpotNo;

    @ManyToOne(() => Resident, resident => resident.parkingPermits, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Resident_ssn", referencedColumnName: "resSsn" })
    resident;

    @ManyToOne(() => Car, car => car.parkingPermits)
    @JoinColumn({ name: "License_plate", referencedColumnName: "licensePlate" })
    car;

    @ManyToOne(() => ParkingSpot, parkingSpot => parkingSpot.parkingPermits, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "Assigned_lot_no", referencedColumnName: "parentLotNo" },
        { name: "Assigned_complex_id", referencedColumnName: "parentComplexId" },
        { name: "Assigned_spot_no", referencedColumnName: "spotNo" }
    ])
    parkingSpot;
}

module.exports = ParkingPermit;
