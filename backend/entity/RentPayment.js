const { EntitySchema } = require("typeorm");

const RentPayment = new EntitySchema({
    name: "RentPayment",
    tableName: "FALL24_S003_T5_RENTPAYMENT",
    columns: {
        aptId: {
            primary: true,
            type: "varchar",
            length: 30,
            name: "APT_ID"
        },
        residentSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "RESIDENT_SSN"
        },
        paymentDate: {
            primary: true,
            type: "date",
            name: "PAYMENT_DATE"
        },
        paymentAmount: {
            type: "float",
            name: "PAYMENT_AMOUNT",
            nullable: false
        }
    },
    relations: {
        resident: {
            type: "many-to-one",
            target: "Resident",
            joinColumn: {
                name: "RESIDENT_SSN",
                referencedColumnName: "resSsn"
            },
            onDelete: "CASCADE"
        },
        apartment: {
            type: "many-to-one",
            target: "Apartment",
            joinColumn: {
                name: "APT_ID",
                referencedColumnName: "aid"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = RentPayment;
