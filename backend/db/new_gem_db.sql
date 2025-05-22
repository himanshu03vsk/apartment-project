-- Fall24_S003_T5_Amenity Table
CREATE TABLE Fall24_S003_T5_Amenity(
  Amenity_type VARCHAR(100) NOT NULL,
  PRIMARY KEY (Amenity_type)
);

-- Fall24_S003_T5_Person Table
CREATE TABLE Fall24_S003_T5_Person(
  Ssn CHAR(9) NOT NULL,
  Fname VARCHAR(20) NOT NULL,
  Minit CHAR(1),
  Lname VARCHAR(20) NOT NULL,
  Date_of_birth DATE NOT NULL,
  Gender VARCHAR(20) NOT NULL CHECK (Gender IN ('Male', 'Female', 'Prefer not to say')),
  Ethnicity VARCHAR(20),
  Contact CHAR(10) NOT NULL,
  Marital_status VARCHAR(10) NOT NULL CHECK (Marital_status IN ('Married', 'Single', 'Divorced', 'Widowed')),
  PRIMARY KEY (Ssn)
);

-- Fall24_S003_T5_Applicant Table
CREATE TABLE Fall24_S003_T5_Applicant(
  Applicant_ssn CHAR(9) NOT NULL,
  Num_of_dependents INTEGER NOT NULL,
  Income INTEGER NOT NULL,
  Emp_status VARCHAR(15) NOT NULL CHECK (Emp_status IN ('Employed', 'Unemployed', 'Self-employed')),
  Education_status VARCHAR(25) NOT NULL CHECK (Education_status IN ('Highschool Graduate', 'College Graduate', 'Post Graduate')),
  PRIMARY KEY (Applicant_ssn),
  CONSTRAINT APPLICANT_SSN_FK
    FOREIGN KEY (Applicant_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Employee Table
CREATE TABLE Fall24_S003_T5_Employee(
  Emp_ssn CHAR(9) NOT NULL,
  Super_ssn CHAR(9) NULL,
  Complex_id CHAR(12) NOT NULL, -- Will be linked by ALTER TABLE
  PRIMARY KEY (Emp_ssn),
  CONSTRAINT EMP_SSN_FK
    FOREIGN KEY (Emp_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT SUPER_SSN_FK
    FOREIGN KEY (Super_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Fall24_S003_T5_HourlyEmployee Table
CREATE TABLE Fall24_S003_T5_HourlyEmployee(
  Hourly_emp_ssn CHAR(9) NOT NULL,
  Pay_per_hour FLOAT NOT NULL,
  PRIMARY KEY (Hourly_emp_ssn),
  CONSTRAINT HOURLY_EMP_SSN_FK
    FOREIGN KEY (Hourly_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_SalaryEmployee Table
CREATE TABLE Fall24_S003_T5_SalaryEmployee(
  Salary_emp_ssn CHAR(9) NOT NULL,
  Salary INTEGER NOT NULL,
  PRIMARY KEY (Salary_emp_ssn),
  FOREIGN KEY (Salary_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_OfficeWorker Table
CREATE TABLE Fall24_S003_T5_OfficeWorker(
  Office_emp_ssn CHAR(9) NOT NULL,
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Morning', 'Afternoon', 'Evening', 'On-Call')),
  Shift_date DATE NOT NULL,
  PRIMARY KEY (Office_emp_ssn, Shift_date),
  CONSTRAINT OFFICE_EMP_SSN_FK
    FOREIGN KEY (Office_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_MaintenanceStaff Table
CREATE TABLE Fall24_S003_T5_MaintenanceStaff(
  Maintenance_emp_ssn CHAR(9) NOT NULL,
  Specialty VARCHAR(20) NOT NULL CHECK (Specialty IN ('Electrician', 'HVAC', 'Landscape', 'General Maintenance', 'Pest Control', 'Janitorial')),
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Day', 'On-Call')),
  Shift_date DATE NOT NULL,
  PRIMARY KEY (Maintenance_emp_ssn, Shift_date),
  CONSTRAINT MAINTENANCE_EMP_SSN_FK
    FOREIGN KEY (Maintenance_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Complex Table
CREATE TABLE Fall24_S003_T5_Complex(
  Cid CHAR(12) NOT NULL,
  Complex_name VARCHAR(25) NOT NULL,
  Street VARCHAR(25) NOT NULL,
  City VARCHAR(25) NOT NULL,
  State CHAR(2) NOT NULL,
  Zip CHAR(5) NOT NULL,
  Mgr_ssn CHAR(9) NULL, -- Will be linked by ALTER TABLE
  PRIMARY KEY (Cid)
);

-- Fall24_S003_T5_Provides Table
CREATE TABLE Fall24_S003_T5_Provides(
  Complex_id CHAR(12) NOT NULL,
  Amen_type VARCHAR(100) NOT NULL,
  Quantity VARCHAR(10),
  Description VARCHAR(100) NOT NULL,
  PRIMARY KEY (Complex_id, Amen_type),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT AMEN_TYPE_FK
    FOREIGN KEY (Amen_type) REFERENCES Fall24_S003_T5_Amenity(Amenity_type)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Building Table
CREATE TABLE Fall24_S003_T5_Building(
  Bid VARCHAR(40) GENERATED ALWAYS AS (CONCAT(Complex_id, '-B', CAST(Building_no AS CHAR))) STORED,
  Building_no INTEGER NOT NULL,
  Num_of_floors INTEGER NOT NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY (Bid),
  CONSTRAINT BUILDING_COMPLEX_ID_FK
    FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_FemaLetter Table
CREATE TABLE Fall24_S003_T5_FemaLetter(
  Building_id VARCHAR(40) NOT NULL,
  Case_no VARCHAR(20) NOT NULL,
  Lot_no INTEGER,
  Block_no INTEGER,
  Section_no INTEGER,
  Subdivision VARCHAR(25),
  Str_add VARCHAR(25),
  flood_zone VARCHAR(10) NOT NULL,
  Base_flood_elev FLOAT,
  Lowest_adj_grade_elev FLOAT,
  Lowest_lot_elev FLOAT,
  PRIMARY KEY (Building_id, Case_no),
  CONSTRAINT FEMA_BUILDING_ID_FK
    FOREIGN KEY (Building_id) REFERENCES Fall24_S003_T5_Building(Bid)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Apartment Table
CREATE TABLE Fall24_S003_T5_Apartment(
  Aid VARCHAR(60) GENERATED ALWAYS AS (CONCAT(Building_id, '-A', CAST(Apt_no AS CHAR))) STORED,
  Apt_no INTEGER NOT NULL,
  Floor_no INTEGER NOT NULL,
  Num_of_bedrooms INTEGER NOT NULL,
  Num_of_bathrooms INTEGER NOT NULL,
  Total_sqft FLOAT NOT NULL,
  Pet_friendly CHAR(1) NOT NULL CHECK (Pet_friendly IN ('Y', 'N')),
  Smoking CHAR(1) NOT NULL CHECK (Smoking IN ('Y', 'N')),
  Furnished CHAR(1) NOT NULL CHECK (Furnished IN ('Y', 'N')),
  Rent INTEGER NOT NULL,
  Building_id VARCHAR(40) NOT NULL,
  PRIMARY KEY (Aid),
  CONSTRAINT APT_BUILDING_ID_FK
    FOREIGN KEY (Building_id) REFERENCES Fall24_S003_T5_Building(Bid)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_AppliesTo Table
CREATE TABLE Fall24_S003_T5_AppliesTo(
  Complex_id CHAR(12) NOT NULL,
  App_ssn CHAR(9) NOT NULL,
  Num_of_bedrooms INTEGER NOT NULL,
  Num_of_bathrooms INTEGER NOT NULL,
  Applied_date DATE NOT NULL,
  PRIMARY KEY (Complex_id, App_ssn),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT APP_SSN_FK
    FOREIGN KEY (App_ssn) REFERENCES Fall24_S003_T5_Applicant(Applicant_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Resident Table
CREATE TABLE Fall24_S003_T5_Resident(
  Res_ssn CHAR(9) NOT NULL,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Apt_id VARCHAR(60) NOT NULL,
  PRIMARY KEY (Res_ssn),
  CONSTRAINT RES_SSN_FK
    FOREIGN KEY (Res_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT APT_ID_FK
    FOREIGN KEY (Apt_id) REFERENCES Fall24_S003_T5_Apartment(Aid)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_Car Table
CREATE TABLE Fall24_S003_T5_Car(
  License_plate VARCHAR(8) NOT NULL,
  Make VARCHAR(25),
  Model VARCHAR(25),
  Year CHAR(4),
  Resident_ssn CHAR(9) NOT NULL,
  PRIMARY KEY (License_plate),
  CONSTRAINT RESIDENT_SSN_FK
    FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_ParkingLot Table
CREATE TABLE Fall24_S003_T5_ParkingLot(
  Lot_no CHAR(1) NOT NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY(Lot_no, Complex_id),
  CONSTRAINT PARKING_COMPLEX_ID_FK
    FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_ParkingSpot Table
CREATE TABLE Fall24_S003_T5_ParkingSpot(
  Parent_lot_no CHAR(1) NOT NULL,
  Parent_complex_id CHAR(12) NOT NULL,
  Spot_no VARCHAR(2) NOT NULL,
  Occupancy CHAR(1) NOT NULL,
  Parking_type VARCHAR(20) NOT NULL CHECK (Parking_type IN ('Covered', 'Uncovered', 'Garage', 'Handicap')),
  PRIMARY KEY (Parent_lot_no, Parent_complex_id, Spot_no),
  CONSTRAINT PARENT_LOT_NO_FK
    FOREIGN KEY (Parent_lot_no, Parent_complex_id) REFERENCES Fall24_S003_T5_ParkingLot(Lot_no, Complex_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_ParkingPermit Table
CREATE TABLE Fall24_S003_T5_ParkingPermit(
   Resident_ssn CHAR(9) NOT NULL,
   License_plate VARCHAR(8) NOT NULL,
   Start_date DATE NOT NULL,
   End_date DATE NOT NULL,
   Assigned_lot_no CHAR(1) NOT NULL,
   Assigned_complex_id CHAR(12) NOT NULL,
   Assigned_spot_no VARCHAR(2) NOT NULL,
   PRIMARY KEY (Resident_ssn, License_plate),
   CONSTRAINT PARKING_RESIDENT_SSN_FK
     FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
     ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT ASSIGNED_PARKING_FK
     FOREIGN KEY (Assigned_lot_no, Assigned_complex_id, Assigned_spot_no) REFERENCES Fall24_S003_T5_ParkingSpot(Parent_lot_no, Parent_complex_id, Spot_no)
     ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_RentPayment Table
CREATE TABLE Fall24_S003_T5_RentPayment(
  Resident_ssn CHAR(9) NOT NULL,
  Due_date DATE NOT NULL,
  Date_paid DATE NOT NULL,
  PRIMARY KEY (Resident_ssn, Due_date, Date_paid),
  CONSTRAINT RENT_RESIDENTSSN_FK
    FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_MaintenanceTicket Table
CREATE TABLE Fall24_S003_T5_MaintenanceTicket(
  Ticket_no INTEGER NOT NULL,
  Resident_ssn CHAR(9) NOT NULL,
  Apt_id VARCHAR(60) NOT NULL,
  Ticket_item VARCHAR(25) NOT NULL,
  Ticket_category VARCHAR(25) NOT NULL,
  Ticket_severity VARCHAR(25) NOT NULL,
  Date_submitted DATE NOT NULL,
  PRIMARY KEY (Apt_id, Resident_ssn, Ticket_no),
  CONSTRAINT MAINTENANCE_APTID_FK
    FOREIGN KEY (Apt_id) REFERENCES Fall24_S003_T5_Apartment(Aid)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT MAINTENANCE_RESIDENT_SSN_FK
    FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Fall24_S003_T5_WorksOn Table
CREATE TABLE Fall24_S003_T5_WorksOn(
  Ticket_apt_id VARCHAR(60) NOT NULL,
  Ticket_no INTEGER NOT NULL,
  Worker_ssn CHAR(9) NOT NULL,
  Resident_ssn CHAR(9) NOT NULL,
  Date_submitted DATE NOT NULL,
  PRIMARY KEY (Worker_ssn, Resident_ssn, Ticket_no, Ticket_apt_id),
  CONSTRAINT WRKS_WORKER_SSN_FK
    FOREIGN KEY (Worker_ssn, Date_submitted) REFERENCES Fall24_S003_T5_MaintenanceStaff(Maintenance_emp_ssn, Shift_date)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT WRKS_RESIDENTSSN_FK
    FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT WRKS_TICKETNO_FK
    FOREIGN KEY (Ticket_apt_id, Resident_ssn, Ticket_no) REFERENCES Fall24_S003_T5_MaintenanceTicket(Apt_id, Resident_ssn, Ticket_no)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ALTER TABLE statements moved to the end
ALTER TABLE Fall24_S003_T5_Employee
ADD CONSTRAINT COMPLEX_ID_FK
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
  ON UPDATE CASCADE;

ALTER TABLE Fall24_S003_T5_Complex
ADD CONSTRAINT MGR_SSN_FK
  FOREIGN KEY (Mgr_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Triggers (No changes here, assuming they are fine if tables exist)
-- Trigger for Person table update
DROP TRIGGER IF EXISTS Person_update_trg;
DELIMITER //
CREATE TRIGGER Person_update_trg
AFTER UPDATE ON Fall24_S003_T5_Person
FOR EACH ROW
BEGIN
    IF OLD.Ssn <> NEW.Ssn THEN
        UPDATE Fall24_S003_T5_Applicant
        SET Applicant_ssn = NEW.Ssn
        WHERE Applicant_ssn = OLD.Ssn;

        UPDATE Fall24_S003_T5_Employee
        SET Emp_ssn = NEW.Ssn
        WHERE Emp_ssn = OLD.Ssn;

        UPDATE Fall24_S003_T5_Resident
        SET Res_ssn = NEW.Ssn
        WHERE Res_ssn = OLD.Ssn;
    END IF;
END //
DELIMITER ;

-- Trigger for Employee table update
DROP TRIGGER IF EXISTS Employee_update_trg;
DELIMITER //
CREATE TRIGGER Employee_update_trg
AFTER UPDATE ON Fall24_S003_T5_Employee
FOR EACH ROW
BEGIN
    IF OLD.Emp_ssn <> NEW.Emp_ssn THEN
        UPDATE Fall24_S003_T5_HourlyEmployee
        SET Hourly_emp_ssn = NEW.Emp_ssn
        WHERE Hourly_emp_ssn = OLD.Emp_ssn;

        UPDATE Fall24_S003_T5_SalaryEmployee
        SET Salary_emp_ssn = NEW.Emp_ssn
        WHERE Salary_emp_ssn = OLD.Emp_ssn;

        UPDATE Fall24_S003_T5_OfficeWorker
        SET Office_emp_ssn = NEW.Emp_ssn
        WHERE Office_emp_ssn = OLD.Emp_ssn;

        UPDATE Fall24_S003_T5_MaintenanceStaff
        SET Maintenance_emp_ssn = NEW.Emp_ssn
        WHERE Maintenance_emp_ssn = OLD.Emp_ssn;
    END IF;
END //
DELIMITER ;

-- Trigger for Complex table update
DROP TRIGGER IF EXISTS Complex_update_trg;
DELIMITER //
CREATE TRIGGER Complex_update_trg
AFTER UPDATE ON Fall24_S003_T5_Complex
FOR EACH ROW
BEGIN
    IF OLD.Cid <> NEW.Cid THEN
        UPDATE Fall24_S003_T5_Provides
        SET Complex_id = NEW.Cid
        WHERE Complex_id = OLD.Cid;

        UPDATE Fall24_S003_T5_Building
        SET Complex_id = NEW.Cid
        WHERE Complex_id = OLD.Cid;

        UPDATE Fall24_S003_T5_ParkingLot
        SET Complex_id = NEW.Cid
        WHERE Complex_id = OLD.Cid;

        UPDATE Fall24_S003_T5_AppliesTo
        SET Complex_id = NEW.Cid
        WHERE Complex_id = OLD.Cid;

        UPDATE Fall24_S003_T5_Employee
        SET Complex_id = NEW.Cid
        WHERE Complex_id = OLD.Cid;
    END IF;
END //
DELIMITER ;

-- Trigger for Amenity table update
DROP TRIGGER IF EXISTS Amenity_update_trg;
DELIMITER //
CREATE TRIGGER Amenity_update_trg
AFTER UPDATE ON Fall24_S003_T5_Amenity
FOR EACH ROW
BEGIN
    IF OLD.Amenity_type <> NEW.Amenity_type THEN
        UPDATE Fall24_S003_T5_Provides
        SET Amen_type = NEW.Amenity_type
        WHERE Amen_type = OLD.Amenity_type;
    END IF;
END //
DELIMITER ;

-- Trigger for Building table update
DROP TRIGGER IF EXISTS Building_update_trg;
DELIMITER //
CREATE TRIGGER Building_update_trg
AFTER UPDATE ON Fall24_S003_T5_Building
FOR EACH ROW
BEGIN
    IF OLD.Bid <> NEW.Bid THEN
        UPDATE Fall24_S003_T5_FemaLetter
        SET Building_id = NEW.Bid
        WHERE Building_id = OLD.Bid;

        UPDATE Fall24_S003_T5_Apartment
        SET Building_id = NEW.Bid
        WHERE Building_id = OLD.Bid;
    END IF;
END //
DELIMITER ;

-- Trigger for ParkingLot table update
DROP TRIGGER IF EXISTS Parking_lot_update_trg;
DELIMITER //
CREATE TRIGGER Parking_lot_update_trg
AFTER UPDATE ON Fall24_S003_T5_ParkingLot
FOR EACH ROW
BEGIN
    IF OLD.Lot_no <> NEW.Lot_no OR OLD.Complex_id <> NEW.Complex_id THEN
        UPDATE Fall24_S003_T5_ParkingSpot
        SET Parent_lot_no = NEW.Lot_no, Parent_complex_id = NEW.Complex_id
        WHERE Parent_lot_no = OLD.Lot_no AND Parent_complex_id = OLD.Complex_id;
    END IF;
END //
DELIMITER ;

-- Trigger for Applicant table update
DROP TRIGGER IF EXISTS Applicant_update_trg;
DELIMITER //
CREATE TRIGGER Applicant_update_trg
AFTER UPDATE ON Fall24_S003_T5_Applicant
FOR EACH ROW
BEGIN
    IF OLD.Applicant_ssn <> NEW.Applicant_ssn THEN
        UPDATE Fall24_S003_T5_AppliesTo
        SET App_ssn = NEW.Applicant_ssn
        WHERE App_ssn = OLD.Applicant_ssn;
    END IF;
END //
DELIMITER ;