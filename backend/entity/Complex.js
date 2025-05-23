const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Employee = require("./Employee");

@Entity("Fall24_S003_T5_Complex")
class Complex {
    @PrimaryColumn({
        type: "char",
        length: 12,
        name: "Cid"
    })
    cid;

    @Column({
        type: "varchar",
        length: 25,
        name: "Complex_name",
        nullable: false
    })
    complexName;

    @Column({
        type: "varchar",
        length: 25,
        name: "Street",
        nullable: false
    })
    street;

    @Column({
        type: "varchar",
        length: 25,
        name: "City",
        nullable: false
    })
    city;

    @Column({
        type: "char",
        length: 2,
        name: "State",
        nullable: false
    })
    state;

    @Column({
        type: "char",
        length: 5,
        name: "Zip",
        nullable: false
    })
    zip;

    @Column({
        type: "char",
        length: 9,
        name: "Mgr_ssn",
        nullable: true
    })
    mgrSsn;

    @ManyToOne(() => Employee, employee => employee.managedComplexes)
    @JoinColumn({ name: "Mgr_ssn", referencedColumnName: "empSsn" })
    manager;

    @OneToMany(() => Employee, employee => employee.complex)
    employees;

    @OneToMany(() => Provides, provides => provides.complex)
    amenities;

    @OneToMany(() => Building, building => building.complex)
    buildings;

    @OneToMany(() => ParkingLot, parkingLot => parkingLot.complex)
    parkingLots;

    @OneToMany(() => AppliesTo, appliesTo => appliesTo.complex)
    applications;
}

module.exports = Complex;
