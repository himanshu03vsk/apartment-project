const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Person = require("./Person");
const Apartment = require("./Apartment");

@Entity("Fall24_S003_T5_Resident")
class Resident {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Res_ssn"
    })
    resSsn;

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
        type: "varchar",
        length: 30,
        name: "Apt_id",
        nullable: false
    })
    aptId;

    @ManyToOne(() => Person, person => person.residents, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Res_ssn", referencedColumnName: "ssn" })
    person;

    @ManyToOne(() => Apartment, apartment => apartment.residents, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Apt_id", referencedColumnName: "aid" })
    apartment;

    @OneToMany(() => Car, car => car.resident)
    cars;

    @OneToMany(() => ParkingPermit, parkingPermit => parkingPermit.resident)
    parkingPermits;

    @OneToMany(() => RentPayment, rentPayment => rentPayment.resident)
    rentPayments;

    @OneToMany(() => MaintenanceTicket, maintenanceTicket => maintenanceTicket.resident)
    maintenanceTickets;

    @OneToMany(() => WorksOn, worksOn => worksOn.resident)
    maintenanceWork;
}

module.exports = Resident;
