const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Employee = require("./Employee");

@Entity("Fall24_S003_T5_HourlyEmployee")
class HourlyEmployee {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Hourly_emp_ssn"
    })
    hourlyEmpSsn;

    @Column({
        type: "float",
        name: "Pay_per_hour",
        nullable: false
    })
    payPerHour;

    @ManyToOne(() => Employee, employee => employee.hourlyEmployees, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Hourly_emp_ssn", referencedColumnName: "empSsn" })
    employee;
}

module.exports = HourlyEmployee;
