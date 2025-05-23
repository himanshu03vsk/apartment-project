const { Entity, Column, PrimaryColumn, OneToMany } = require("typeorm");

@Entity("Fall24_S003_T5_Person")
class Person {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Ssn"
    })
    ssn;

    @Column({
        type: "varchar",
        length: 20,
        name: "Fname",
        nullable: false
    })
    fname;

    @Column({
        type: "char",
        length: 1,
        name: "Minit",
        nullable: true
    })
    minit;

    @Column({
        type: "varchar",
        length: 20,
        name: "Lname",
        nullable: false
    })
    lname;

    @Column({
        type: "date",
        name: "Date_of_birth",
        nullable: false
    })
    dateOfBirth;

    @Column({
        type: "varchar",
        length: 20,
        name: "Gender",
        nullable: false,
        enum: ['Male', 'Female', 'Prefer not to say']
    })
    gender;

    @Column({
        type: "varchar",
        length: 20,
        name: "Ethnicity",
        nullable: true
    })
    ethnicity;

    @Column({
        type: "char",
        length: 10,
        name: "Contact",
        nullable: false
    })
    contact;

    @Column({
        type: "varchar",
        length: 10,
        name: "Marital_status",
        nullable: false,
        enum: ['Married', 'Single', 'Divorced', 'Widowed']
    })
    maritalStatus;

    // Relationships will be defined in related entities
    @OneToMany(() => Applicant, applicant => applicant.person)
    applicants;

    @OneToMany(() => Employee, employee => employee.person)
    employees;

    @OneToMany(() => Resident, resident => resident.person)
    residents;
}

module.exports = Person; 