const { EntitySchema } = require("typeorm");

const SalaryEmployee = new EntitySchema({
    name: "SalaryEmployee",
    tableName: "FALL24_S003_T5_SALARYEMPLOYEE",
    columns: {
        salaryEmpSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "SALARY_EMP_SSN"
        },
        salary: {
            type: "float",
            name: "SALARY",
            nullable: false
        }
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "SALARY_EMP_SSN",
                referencedColumnName: "empSsn"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = SalaryEmployee;
