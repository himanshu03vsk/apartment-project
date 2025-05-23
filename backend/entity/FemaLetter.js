const { EntitySchema } = require("typeorm");
const Building = require("./Building");

const FemaLetter = new EntitySchema({
    name: "FemaLetter",
    tableName: "FALL24_S003_T5_FEMALETTER",
    columns: {
        buildingId: {
            primary: true,
            type: "varchar",
            length: 20,
            name: "BUILDING_ID"
        },
        caseNo: {
            primary: true,
            type: "varchar",
            length: 20,
            name: "CASE_NO"
        },
        lotNo: {
            type: "integer",
            name: "LOT_NO",
            nullable: true
        },
        blockNo: {
            type: "integer",
            name: "BLOCK_NO",
            nullable: true
        },
        sectionNo: {
            type: "integer",
            name: "SECTION_NO",
            nullable: true
        },
        subdivision: {
            type: "varchar",
            length: 25,
            name: "SUBDIVISION",
            nullable: true
        },
        strAdd: {
            type: "varchar",
            length: 25,
            name: "STR_ADD",
            nullable: true
        },
        floodZone: {
            type: "varchar",
            length: 10,
            name: "FLOOD_ZONE",
            nullable: false
        },
        baseFloodElev: {
            type: "float",
            name: "BASE_FLOOD_ELEV",
            nullable: true
        },
        lowestAdjGradeElev: {
            type: "float",
            name: "LOWEST_ADJ_GRADE_ELEV",
            nullable: true
        },
        lowestLotElev: {
            type: "float",
            name: "LOWEST_LOT_ELEV",
            nullable: true
        }
    },
    relations: {
        building: {
            type: "many-to-one",
            target: "Building",
            joinColumn: {
                name: "BUILDING_ID",
                referencedColumnName: "bid"
            },
            onDelete: "CASCADE"
        }
    }
});

module.exports = FemaLetter;
