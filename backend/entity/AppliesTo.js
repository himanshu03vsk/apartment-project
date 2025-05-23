const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Complex = require("./Complex");
const Applicant = require("./Applicant");

@Entity("Fall24_S003_T5_AppliesTo")
class AppliesTo {
    @PrimaryColumn({
        type: "char",
        length: 12,
        name: "Complex_id"
    })
    complexId;

    @PrimaryColumn({
        type: "char",
        length: 9,
        name: "App_ssn"
    })
    appSsn;

    @Column({
        type: "integer",
        name: "Num_of_bedrooms",
        nullable: false
    })
    numOfBedrooms;

    @Column({
        type: "integer",
        name: "Num_of_bathrooms",
        nullable: false
    })
    numOfBathrooms;

    @Column({
        type: "date",
        name: "Applied_date",
        nullable: false
    })
    appliedDate;

    @ManyToOne(() => Complex, complex => complex.applications, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Complex_id", referencedColumnName: "cid" })
    complex;

    @ManyToOne(() => Applicant, applicant => applicant.applications, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "App_ssn", referencedColumnName: "applicantSsn" })
    applicant;
}

module.exports = AppliesTo;
