const { EntitySchema } = require("typeorm");
const MaintenanceStaff = require("./MaintenanceStaff");
const Resident = require("./Resident");
const MaintenanceTicket = require("./MaintenanceTicket");

const WorksOn = new EntitySchema({
    name: "WorksOn",
    tableName: "FALL24_S003_T5_WORKSON",
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
        ticketNo: {
            primary: true,
            type: "integer",
            name: "TICKET_NO"
        },
        hoursWorked: {
            type: "float",
            name: "HOURS_WORKED",
            nullable: false
        }
    },
    relations: {
        maintenanceStaff: {
            type: "many-to-one",
            target: "MaintenanceStaff",
            joinColumn: [
                { name: "MAINTENANCE_EMP_SSN", referencedColumnName: "maintenanceEmpSsn" },
                { name: "SHIFT_DATE", referencedColumnName: "shiftDate" }
            ],
            onDelete: "CASCADE"
        },
        maintenanceTicket: {
            type: "many-to-one",
            target: "MaintenanceTicket",
            joinColumn: [
                { name: "APT_ID", referencedColumnName: "aptId" },
                { name: "RESIDENT_SSN", referencedColumnName: "residentSsn" },
                { name: "TICKET_NO", referencedColumnName: "ticketNo" }
            ],
            onDelete: "CASCADE"
        }
    }
});

module.exports = WorksOn; 