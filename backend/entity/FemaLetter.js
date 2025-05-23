const { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } = require("typeorm");
const Building = require("./Building");

@Entity("Fall24_S003_T5_FemaLetter")
class FemaLetter {
    @PrimaryColumn({
        type: "varchar",
        length: 20,
        name: "Building_id"
    })
    buildingId;

    @PrimaryColumn({
        type: "varchar",
        length: 20,
        name: "Case_no"
    })
    caseNo;

    @Column({
        type: "integer",
        name: "Lot_no",
        nullable: true
    })
    lotNo;

    @Column({
        type: "integer",
        name: "Block_no",
        nullable: true
    })
    blockNo;

    @Column({
        type: "integer",
        name: "Section_no",
        nullable: true
    })
    sectionNo;

    @Column({
        type: "varchar",
        length: 25,
        name: "Subdivision",
        nullable: true
    })
    subdivision;

    @Column({
        type: "varchar",
        length: 25,
        name: "Str_add",
        nullable: true
    })
    strAdd;

    @Column({
        type: "varchar",
        length: 10,
        name: "flood_zone",
        nullable: false
    })
    floodZone;

    @Column({
        type: "float",
        name: "Base_flood_elev",
        nullable: true
    })
    baseFloodElev;

    @Column({
        type: "float",
        name: "Lowest_adj_grade_elev",
        nullable: true
    })
    lowestAdjGradeElev;

    @Column({
        type: "float",
        name: "Lowest_lot_elev",
        nullable: true
    })
    lowestLotElev;

    @ManyToOne(() => Building, building => building.femaLetters, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Building_id", referencedColumnName: "bid" })
    building;
}

module.exports = FemaLetter;
