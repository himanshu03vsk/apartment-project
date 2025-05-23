const { EntitySchema } = require("typeorm");
const Person = require("./Person");
const Complex = require("./Complex");

const Employee = new EntitySchema({
    name: "Employee",
    tableName: "FALL24_S003_T5_EMPLOYEE",
    columns: {
        empSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "EMP_SSN"
        },
        superSsn: {
            type: "char",
            length: 9,
            name: "SUPER_SSN",
            nullable: true
        },
        complexId: {
            type: "char",
            length: 12,
            name: "COMPLEX_ID",
            nullable: false
        }
    },
    relations: {
        person: {
            type: "many-to-one",
            target: "Person",
            joinColumn: {
                name: "EMP_SSN",
                referencedColumnName: "ssn"
            },
            onDelete: "CASCADE"
        },
        supervisor: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "SUPER_SSN",
                referencedColumnName: "empSsn"
            },
            onDelete: "SET NULL"
        },
        subordinates: {
            type: "one-to-many",
            target: "Employee",
            inverseSide: "supervisor"
        },
        complex: {
            type: "many-to-one",
            target: "Complex",
            joinColumn: {
                name: "COMPLEX_ID",
                referencedColumnName: "cid"
            }
        },
        managedComplexes: {
            type: "one-to-many",
            target: "Complex",
            inverseSide: "manager"
        },
        hourlyEmployees: {
            type: "one-to-many",
            target: "HourlyEmployee",
            inverseSide: "employee"
        },
        salaryEmployees: {
            type: "one-to-many",
            target: "SalaryEmployee",
            inverseSide: "employee"
        },
        officeWorkers: {
            type: "one-to-many",
            target: "OfficeWorker",
            inverseSide: "employee"
        },
        maintenanceStaff: {
            type: "one-to-many",
            target: "MaintenanceStaff",
            inverseSide: "employee"
        }
    }
});

module.exports = Employee;
