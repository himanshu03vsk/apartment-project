const { EntitySchema } = require("typeorm");

const OfficeWorker = new EntitySchema({
    name: "OfficeWorker",
    tableName: "FALL24_S003_T5_OFFICEWORKER",
    columns: {
        officeEmpSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "OFFICE_EMP_SSN"
        },
        shiftDate: {
            primary: true,
            type: "date",
            name: "SHIFT_DATE"
        },
        shift: {
            type: "varchar",
            length: 20,
            name: "SHIFT",
            nullable: false,
            enum: ['Morning', 'Afternoon', 'Evening', 'On-Call']
        }
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "OFFICE_EMP_SSN",
                referencedColumnName: "empSsn"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = OfficeWorker;
