const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Employee = require("./Employee");

@Entity("Fall24_S003_T5_SalaryEmployee")
class SalaryEmployee {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Salary_emp_ssn"
    })
    salaryEmpSsn;

    @Column({
        type: "integer",
        name: "Salary",
        nullable: false
    })
    salary;

    @ManyToOne(() => Employee, employee => employee.salaryEmployees, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Salary_emp_ssn", referencedColumnName: "empSsn" })
    employee;
}

module.exports = SalaryEmployee;
