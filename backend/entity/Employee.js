const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } = require("typeorm");
const Person = require("./Person");
const Complex = require("./Complex");

@Entity("Fall24_S003_T5_Employee")
class Employee {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Emp_ssn"
    })
    empSsn;

    @Column({
        type: "char",
        length: 9,
        name: "Super_ssn",
        nullable: true
    })
    superSsn;

    @Column({
        type: "char",
        length: 12,
        name: "Complex_id",
        nullable: false
    })
    complexId;

    @ManyToOne(() => Person, person => person.employees, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Emp_ssn", referencedColumnName: "ssn" })
    person;

    @ManyToOne(() => Employee, employee => employee.subordinates, {
        onDelete: "SET NULL"
    })
    @JoinColumn({ name: "Super_ssn", referencedColumnName: "empSsn" })
    supervisor;

    @OneToMany(() => Employee, employee => employee.supervisor)
    subordinates;

    @ManyToOne(() => Complex, complex => complex.employees)
    @JoinColumn({ name: "Complex_id", referencedColumnName: "cid" })
    complex;

    @OneToMany(() => Complex, complex => complex.manager)
    managedComplexes;

    @OneToMany(() => HourlyEmployee, hourlyEmployee => hourlyEmployee.employee)
    hourlyEmployees;

    @OneToMany(() => SalaryEmployee, salaryEmployee => salaryEmployee.employee)
    salaryEmployees;

    @OneToMany(() => OfficeWorker, officeWorker => officeWorker.employee)
    officeWorkers;

    @OneToMany(() => MaintenanceStaff, maintenanceStaff => maintenanceStaff.employee)
    maintenanceStaff;
}

module.exports = Employee;
