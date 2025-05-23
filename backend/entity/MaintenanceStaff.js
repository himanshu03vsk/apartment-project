const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } = require("typeorm");
const Employee = require("./Employee");

@Entity("Fall24_S003_T5_MaintenanceStaff")
class MaintenanceStaff {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Maintenance_emp_ssn"
    })
    maintenanceEmpSsn;

    @PrimaryColumn({
        type: "date",
        name: "Shift_date"
    })
    shiftDate;

    @Column({
        type: "varchar",
        length: 20,
        name: "Specialty",
        nullable: false,
        enum: ['Electrician', 'HVAC', 'Landscape', 'General Maintenance', 'Pest Control', 'Janitorial']
    })
    specialty;

    @Column({
        type: "varchar",
        length: 20,
        name: "Shift",
        nullable: false,
        enum: ['Day', 'On-Call']
    })
    shift;

    @ManyToOne(() => Employee, employee => employee.maintenanceStaff, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Maintenance_emp_ssn", referencedColumnName: "empSsn" })
    employee;

    @OneToMany(() => WorksOn, worksOn => worksOn.maintenanceStaff)
    worksOnTickets;
}

module.exports = MaintenanceStaff;
