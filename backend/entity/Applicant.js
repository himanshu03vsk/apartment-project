const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } = require("typeorm");
const Person = require("./Person");

@Entity("Fall24_S003_T5_Applicant")
class Applicant {
    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "Applicant_ssn"
    })
    applicantSsn;

    @Column({
        type: "integer",
        name: "Num_of_dependents",
        nullable: false
    })
    numOfDependents;

    @Column({
        type: "integer",
        name: "Income",
        nullable: false
    })
    income;

    @Column({
        type: "varchar",
        length: 15,
        name: "Emp_status",
        nullable: false,
        enum: ['Employed', 'Unemployed', 'Self-employed']
    })
    empStatus;

    @Column({
        type: "varchar",
        length: 25,
        name: "Education_status",
        nullable: false,
        enum: ['Highschool Graduate', 'College Graduate', 'Post Graduate']
    })
    educationStatus;

    @ManyToOne(() => Person, person => person.applicants, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Applicant_ssn", referencedColumnName: "ssn" })
    person;

    @OneToMany(() => AppliesTo, appliesTo => appliesTo.applicant)
    applications;
}

module.exports = Applicant;
