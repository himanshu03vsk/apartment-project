const { EntitySchema } = require("typeorm");

const MaintenanceTicket = new EntitySchema({
    name: "MaintenanceTicket",
    tableName: "FALL24_S003_T5_MAINTENANCETICKET",
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
        ticketNo: {
            primary: true,
            type: "integer",
            name: "TICKET_NO"
        },
        ticketItem: {
            type: "varchar",
            length: 25,
            name: "TICKET_ITEM",
            nullable: false
        },
        ticketCategory: {
            type: "varchar",
            length: 25,
            name: "TICKET_CATEGORY",
            nullable: false
        },
        ticketSeverity: {
            type: "varchar",
            length: 25,
            name: "TICKET_SEVERITY",
            nullable: false
        },
        dateSubmitted: {
            type: "date",
            name: "DATE_SUBMITTED",
            nullable: false
        }
    },
    relations: {
        apartment: {
            type: "many-to-one",
            target: "Apartment",
            joinColumn: {
                name: "APT_ID",
                referencedColumnName: "aid"
            },
            onDelete: "CASCADE"
        },
        resident: {
            type: "many-to-one",
            target: "Resident",
            joinColumn: {
                name: "RESIDENT_SSN",
                referencedColumnName: "resSsn"
            },
            onDelete: "CASCADE"
        },
        worksOnStaff: {
            type: "one-to-many",
            target: "WorksOn",
            inverseSide: "maintenanceTicket"
        }
    }
});

module.exports = MaintenanceTicket;
