const { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
const Building = require("./Building");

@Entity("Fall24_S003_T5_Apartment")
class Apartment {
    @PrimaryColumn({
        type: "varchar",
        length: 30,
        name: "Aid",
        generated: "ALWAYS"
    })
    aid;

    @Column({
        type: "integer",
        name: "Apt_no",
        nullable: false
    })
    aptNo;

    @Column({
        type: "integer",
        name: "Floor_no",
        nullable: false
    })
    floorNo;

    @Column({
        type: "integer",
        name: "Num_of_bedrooms",
        nullable: false
    })
    numOfBedrooms;

    @Column({
        type: "integer",
        name: "Num_of_bathrooms",
        nullable: false
    })
    numOfBathrooms;

    @Column({
        type: "float",
        name: "Total_sqft",
        nullable: false
    })
    totalSqft;

    @Column({
        type: "char",
        length: 1,
        name: "Pet_friendly",
        nullable: false,
        enum: ['Y', 'N']
    })
    petFriendly;

    @Column({
        type: "char",
        length: 1,
        name: "Smoking",
        nullable: false,
        enum: ['Y', 'N']
    })
    smoking;

    @Column({
        type: "char",
        length: 1,
        name: "Furnished",
        nullable: false,
        enum: ['Y', 'N']
    })
    furnished;

    @Column({
        type: "integer",
        name: "Rent",
        nullable: false
    })
    rent;

    @Column({
        type: "varchar",
        length: 20,
        name: "Building_id",
        nullable: false
    })
    buildingId;

    @ManyToOne(() => Building, building => building.apartments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "Building_id", referencedColumnName: "bid" })
    building;

    @OneToMany(() => Resident, resident => resident.apartment)
    residents;

    @OneToMany(() => MaintenanceTicket, maintenanceTicket => maintenanceTicket.apartment)
    maintenanceTickets;
}

module.exports = Apartment;
