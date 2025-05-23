const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Employee = require("./Employee");

@Entity("Fall24_S003_T5_OfficeWorker")
class OfficeWorker {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Office_emp_ssn"
    })
    officeEmpSsn;

    @PrimaryColumn({
        type: "date",
        name: "Shift_date"
    })
    shiftDate;

    @Column({
        type: "varchar",
        length: 20,
        name: "Shift",
        nullable: false,
        enum: ['Morning', 'Afternoon', 'Evening', 'On-Call']
    })
    shift;

    @ManyToOne(() => Employee, employee => employee.officeWorkers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Office_emp_ssn", referencedColumnName: "empSsn" })
    employee;
}

module.exports = OfficeWorker;
