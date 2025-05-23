const { EntitySchema } = require("typeorm");

const Person = new EntitySchema({
    name: "Person",
    tableName: "FALL24_S003_T5_PERSON",
    columns: {
        ssn: {
            primary: true,
            type: "char",
            length: 9,
            name: "SSN"
        },
        fname: {
            type: "varchar",
            length: 20,
            name: "FNAME",
            nullable: false
        },
        minit: {
            type: "char",
            length: 1,
            name: "MINIT",
            nullable: true
        },
        lname: {
            type: "varchar",
            length: 20,
            name: "LNAME",
            nullable: false
        },
        dateOfBirth: {
            type: "date",
            name: "DATE_OF_BIRTH",
            nullable: false
        },
        gender: {
            type: "varchar",
            length: 20,
            name: "GENDER",
            nullable: false,
            enum: ['Male', 'Female', 'Prefer not to say']
        },
        ethnicity: {
            type: "varchar",
            length: 20,
            name: "ETHNICITY",
            nullable: true
        },
        contact: {
            type: "char",
            length: 10,
            name: "CONTACT",
            nullable: false
        },
        maritalStatus: {
            type: "varchar",
            length: 10,
            name: "MARITAL_STATUS",
            nullable: false,
            enum: ['Married', 'Single', 'Divorced', 'Widowed']
        }
    },
    relations: {
        applicants: {
            type: "one-to-many",
            target: "Applicant",
            inverseSide: "person"
        },
        employees: {
            type: "one-to-many",
            target: "Employee",
            inverseSide: "person"
        },
        residents: {
            type: "one-to-many",
            target: "Resident",
            inverseSide: "person"
        }
    }
});

module.exports = Person; 