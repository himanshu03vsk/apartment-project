const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Resident = require("./Resident");

@Entity("Fall24_S003_T5_RentPayment")
class RentPayment {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Resident_ssn"
    })
    residentSsn;

    @PrimaryColumn({
        type: "date",
        name: "Due_date"
    })
    dueDate;

    @PrimaryColumn({
        type: "date",
        name: "Date_paid"
    })
    datePaid;

    @ManyToOne(() => Resident, resident => resident.rentPayments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Resident_ssn", referencedColumnName: "resSsn" })
    resident;
}

module.exports = RentPayment;
