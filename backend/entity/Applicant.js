const { EntitySchema } = require("typeorm");

const Applicant = new EntitySchema({
    name: "Applicant",
    tableName: "FALL24_S003_T5_APPLICANT",
    columns: {
        applicantSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "APPLICANT_SSN"
        },
        numOfDependents: {
            type: "integer",
            name: "NUM_OF_DEPENDENTS",
            nullable: false
        },
        income: {
            type: "integer",
            name: "INCOME",
            nullable: false
        },
        empStatus: {
            type: "varchar",
            length: 15,
            name: "EMP_STATUS",
            nullable: false,
            enum: ['Employed', 'Unemployed', 'Self-employed']
        },
        educationStatus: {
            type: "varchar",
            length: 25,
            name: "EDUCATION_STATUS",
            nullable: false,
            enum: ['Highschool Graduate', 'College Graduate', 'Post Graduate']
        }
    },
    relations: {
        person: {
            type: "many-to-one",
            target: "Person",
            joinColumn: {
                name: "APPLICANT_SSN",
                referencedColumnName: "ssn"
            },
            onDelete: "CASCADE"
        },
        applications: {
            type: "one-to-many",
            target: "AppliesTo",
            inverseSide: "applicant"
        }
    }
});

module.exports = Applicant;
