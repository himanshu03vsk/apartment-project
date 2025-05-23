const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Resident = require("./Resident");
const Apartment = require("./Apartment");

@Entity("Fall24_S003_T5_MaintenanceTicket")
class MaintenanceTicket {
    @PrimaryColumn({
        type: "varchar",
        length: 30,
        name: "Apt_id"
    })
    aptId;

    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Resident_ssn"
    })
    residentSsn;

    @PrimaryColumn({
        type: "integer",
        name: "Ticket_no"
    })
    ticketNo;

    @Column({
        type: "varchar",
        length: 25,
        name: "Ticket_item",
        nullable: false
    })
    ticketItem;

    @Column({
        type: "varchar",
        length: 25,
        name: "Ticket_category",
        nullable: false
    })
    ticketCategory;

    @Column({
        type: "varchar",
        length: 25,
        name: "Ticket_severity",
        nullable: false
    })
    ticketSeverity;

    @Column({
        type: "date",
        name: "Date_submitted",
        nullable: false
    })
    dateSubmitted;

    @ManyToOne(() => Apartment, apartment => apartment.maintenanceTickets, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Apt_id", referencedColumnName: "aid" })
    apartment;

    @ManyToOne(() => Resident, resident => resident.maintenanceTickets, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Resident_ssn", referencedColumnName: "resSsn" })
    resident;

    @OneToMany(() => WorksOn, worksOn => worksOn.maintenanceTicket)
    worksOnStaff;
}

module.exports = MaintenanceTicket;
