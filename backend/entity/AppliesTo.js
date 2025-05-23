const { EntitySchema } = require("typeorm");

const AppliesTo = new EntitySchema({
    name: "AppliesTo",
    tableName: "FALL24_S003_T5_APPLIESTO",
    columns: {
        complexId: {
            primary: true,
            type: "char",
            length: 12,
            name: "COMPLEX_ID"
        },
        appSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "APP_SSN"
        },
        numOfBedrooms: {
            type: "integer",
            name: "NUM_OF_BEDROOMS",
            nullable: false
        },
        numOfBathrooms: {
            type: "integer",
            name: "NUM_OF_BATHROOMS",
            nullable: false
        },
        appliedDate: {
            type: "date",
            name: "APPLIED_DATE",
            nullable: false
        }
    },
    relations: {
        complex: {
            type: "many-to-one",
            target: "Complex",
            joinColumn: {
                name: "COMPLEX_ID",
                referencedColumnName: "cid"
            },
            onDelete: "CASCADE"
        },
        applicant: {
            type: "many-to-one",
            target: "Applicant",
            joinColumn: {
                name: "APP_SSN",
                referencedColumnName: "applicantSsn"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = AppliesTo;
