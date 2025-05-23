const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Resident = require("./Resident");

@Entity("Fall24_S003_T5_Car")
class Car {
    @PrimaryColumn({
        type: "varchar",
        length: 8,
        name: "License_plate"
    })
    licensePlate;

    @Column({
        type: "varchar",
        length: 25,
        name: "Make",
        nullable: true
    })
    make;

    @Column({
        type: "varchar",
        length: 25,
        name: "Model",
        nullable: true
    })
    model;

    @Column({
        type: "char",
        length: 4,
        name: "Year",
        nullable: true
    })
    year;

    @Column({
        type: "char",
        length: 9,
        name: "Resident_ssn",
        nullable: false
    })
    residentSsn;

    @ManyToOne(() => Resident, resident => resident.cars, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Resident_ssn", referencedColumnName: "resSsn" })
    resident;

    @OneToMany(() => ParkingPermit, parkingPermit => parkingPermit.car)
    parkingPermits;
}

module.exports = Car;
