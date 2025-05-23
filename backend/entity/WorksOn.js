const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const MaintenanceStaff = require("./MaintenanceStaff");
const Resident = require("./Resident");
const MaintenanceTicket = require("./MaintenanceTicket");

@Entity("Fall24_S003_T5_WorksOn")
class WorksOn {
    @Column({
        type: "varchar",
        length: 30,
        name: "Ticket_apt_id",
        nullable: false
    })
    ticketAptId;

    @PrimaryColumn({
        type: "integer",
        name: "Ticket_no"
    })
    ticketNo;

    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Worker_ssn"
    })
    workerSsn;

    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Resident_ssn"
    })
    residentSsn;

    @Column({
        type: "date",
        name: "Date_submitted",
        nullable: false
    })
    dateSubmitted;

    @ManyToOne(() => MaintenanceStaff, maintenanceStaff => maintenanceStaff.worksOnTickets, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "Worker_ssn", referencedColumnName: "maintenanceEmpSsn" },
        { name: "Date_submitted", referencedColumnName: "shiftDate" }
    ])
    maintenanceStaff;

    @ManyToOne(() => Resident, resident => resident.maintenanceWork, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Resident_ssn", referencedColumnName: "resSsn" })
    resident;

    @ManyToOne(() => MaintenanceTicket, maintenanceTicket => maintenanceTicket.worksOnStaff, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "Ticket_apt_id", referencedColumnName: "aptId" },
        { name: "Resident_ssn", referencedColumnName: "residentSsn" },
        { name: "Ticket_no", referencedColumnName: "ticketNo" }
    ])
    maintenanceTicket;
}

module.exports = WorksOn; 