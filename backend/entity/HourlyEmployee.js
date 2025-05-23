const { EntitySchema } = require("typeorm");

const HourlyEmployee = new EntitySchema({
    name: "HourlyEmployee",
    tableName: "FALL24_S003_T5_HOURLYEMPLOYEE",
    columns: {
        hourlyEmpSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "HOURLY_EMP_SSN"
        },
        payPerHour: {
            type: "float",
            name: "PAY_PER_HOUR",
            nullable: false
        }
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "HOURLY_EMP_SSN",
                referencedColumnName: "empSsn"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = HourlyEmployee;
