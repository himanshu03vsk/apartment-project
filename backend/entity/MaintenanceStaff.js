const { EntitySchema } = require("typeorm");

const MaintenanceStaff = new EntitySchema({
    name: "MaintenanceStaff",
    tableName: "FALL24_S003_T5_MAINTENANCESTAFF",
    columns: {
        maintenanceEmpSsn: {
            primary: true,
            type: "char",
            length: 9,
            name: "MAINTENANCE_EMP_SSN"
        },
        shiftDate: {
            primary: true,
            type: "date",
            name: "SHIFT_DATE"
        },
        specialty: {
            type: "varchar",
            length: 20,
            name: "SPECIALTY",
            nullable: false,
            enum: ['Electrician', 'HVAC', 'Landscape', 'General Maintenance', 'Pest Control', 'Janitorial']
        },
        shift: {
            type: "varchar",
            length: 20,
            name: "SHIFT",
            nullable: false,
            enum: ['Day', 'On-Call']
        }
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: {
                name: "MAINTENANCE_EMP_SSN",
                referencedColumnName: "empSsn"
            },
            onDelete: "CASCADE"
        },
        worksOnTickets: {
            type: "one-to-many",
            target: "WorksOn",
            inverseSide: "maintenanceStaff"
        }
    }
});

module.exports = MaintenanceStaff;
