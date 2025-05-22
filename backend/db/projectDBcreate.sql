CREATE TABLE Fall24_S003_T5_Amenity(
  Amenity_type VARCHAR(100) NOT NULL, --CHECK (Amentity_type IN ('Pool', 'Gym', 'On Site Laundry', 'Built in Washer/Dryer Selected Apartments', 'Basketball Court', 'Volleyball Court', 'Club House', 'Tennis Court', 'Hot tub')),
 
  PRIMARY KEY (Amenity_type)
);

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
);--done

CREATE TABLE Fall24_S003_T5_Applicant(
  Applicant_ssn CHAR(9) NOT NULL,
  Num_of_dependents INTEGER NOT NULL,
  Income INTEGER NOT NULL,
  Emp_status VARCHAR(15) NOT NULL CHECK (Emp_status IN ('Employed', 'Unemployed', 'Self-employed')),
  Education_status VARCHAR(25) NOT NULL CHECK (Education_status IN ('Highschool Graduate', 'College Graduate', 'Post Graduate')),--do we want to account for people who did not finsih college or highschol or did only partial  

  PRIMARY KEY (Applicant_ssn),
 
  CONSTRAINT APPLICANT_SSN_FK
	 FOREIGN KEY (Applicant_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
  	ON DELETE CASCADE  ---ON UPDATE CASCADE need triggers for this
);--done

CREATE TABLE Fall24_S003_T5_Employee(
  Emp_ssn CHAR(9) NOT NULL,
  Super_ssn CHAR(9) NULL,
  Complex_id CHAR(12) NOT NULL, --DEFAULT 0, default doesn't work for char or varchar needs to be handled in the triggers

  PRIMARY KEY (Emp_ssn),
 
  CONSTRAINT EMP_SSN_FK
	 FOREIGN KEY (Emp_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
  	ON DELETE CASCADE,  ---ON UPDATE CASCADE,
 	 
  -- Need to recheck these constraints the ssn all reference to our employee table
  -- but the emp ssn references back to our super class Person ssn what should happen on delete or udpates
  -- need triggers for on update cascade
 
  CONSTRAINT SUPER_SSN_FK
	 FOREIGN KEY (Super_ssn) REFERENCES  Fall24_S003_T5_Employee(Emp_ssn)
   ON DELETE set null --ON UPDATE CASCADE,
   
  --CONSTRAINT COMPLEXID_FK
	--FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
  	--ON DELETE SET DEFAULT --ON UPDATE CASCADE can't set default value here we need triggers
); --done

CREATE TABLE Fall24_S003_T5_HourlyEmployee(
  Hourly_emp_ssn CHAR(9) NOT NULL,
  Pay_per_hour FLOAT NOT NULL,
 
  PRIMARY KEY (Hourly_emp_ssn),
 
  CONSTRAINT HOURLY_EMP_SSN_FK
	 FOREIGN KEY (Hourly_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE
 
  -- What constraints are needed here, we need triggers for update cascade
);--done

CREATE TABLE Fall24_S003_T5_SalaryEmployee(
  Salary_emp_ssn CHAR(9) NOT NULL,
  Salary INTEGER NOT NULL,
 
  PRIMARY KEY (Salary_emp_ssn),
  FOREIGN KEY (Salary_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
 
  -- What constraints are needed here
); --done

CREATE TABLE Fall24_S003_T5_OfficeWorker(
  Office_emp_ssn CHAR(9) NOT NULL,
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Morning', 'Afternoon', 'Evening', 'On-Call')),
  Shift_date DATE NOT NULL,
  
  PRIMARY KEY (Office_emp_ssn, Shift_date),
  CONSTRAINT OFFICE_EMP_SSN_FK
	 FOREIGN KEY (Office_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE
 
   -- What other constrants or meaningful attributes could be added here to answer some business questions ?
   -- we probably need to include the date , we need triggers for on update cascade
); --done

CREATE TABLE Fall24_S003_T5_MaintenanceStaff(
  Maintenance_emp_ssn CHAR(9) NOT NULL,
  Specialty VARCHAR(20) NOT NULL CHECK (Specialty IN ('Electrician', 'HVAC', 'Landscape', 'General Maintenance', 'Pest Control', 'Janitorial')),
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Day', 'On-Call')),
  Shift_date DATE NOT NULL,
  -- Same issue here as with office worker, we do have a relationship but should we include the specialty
  -- of the particular employee or just group everything under one and any other meaningfull attributes
  -- to answer some business questions
 
  PRIMARY KEY (Maintenance_emp_ssn, Shift_date),
  CONSTRAINT MAINTENANCE_EMP_SSN_FK
	 FOREIGN KEY (Maintenance_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
); --done
	 
CREATE TABLE Fall24_S003_T5_Complex(
  Cid CHAR(12) NOT NULL, --Complex_xxxx
  Complex_name VARCHAR(25) NOT NULL,
  Street VARCHAR(25) NOT NULL,
  City VARCHAR(25) NOT NULL,
  State CHAR(2) NOT NULL,
  Zip CHAR(5) NOT NULL,
  Mgr_ssn CHAR(9) NULL, --DEFAULT 000000000, same issue default doesn't work on char or varchar
 
  PRIMARY KEY (Cid)
  --CONSTRAINT MGRSSN_FK
	--FOREIGN KEY (Mgr_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
  	--ON DELETE SET DEFAULT --ON UPDATE CASCADE we need triggers for on update cascade and trigger for default
); --done

ALTER TABLE Fall24_S003_T5_Employee
ADD CONSTRAINT COMPLEX_ID_FK
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid);
--done

ALTER TABLE Fall24_S003_T5_Complex
ADD CONSTRAINT MGR_SSN_FK
  FOREIGN KEY (Mgr_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn);
--done

CREATE TABLE Fall24_S003_T5_Provides(
  Complex_id CHAR(12) NOT NULL,
  Amen_type VARCHAR(100) NOT NULL,
  Quantity CHAR(10),
  Description VARCHAR(100) NOT NULL,
 
  PRIMARY KEY (Complex_id, Amen_type),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid),
  
  CONSTRAINT AMEN_TYPE_FK
	 FOREIGN KEY (Amen_type) REFERENCES Fall24_S003_T5_Amenity(Amenity_type)
  	ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
 
  -- Do we need constraints here, for delete, updates are these constraints set up properly ?
  -- Quantity and Description not all amentities have a quantity say built in washer and dry etc (google apartment complex)
); --done

CREATE TABLE Fall24_S003_T5_Building(
  Bid GENERATED ALWAYS AS (Complex_id || '-B' || Building_no) VIRTUAL,
  Building_no INTEGER NOT NULL,
  Num_of_floors INTEGER NOT NULL,
  Complex_id CHAR(12) NOT NULL,
 
  PRIMARY KEY (Bid),
 
  CONSTRAINT BUILDING_COMPLEX_ID_FK
	 FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
  	ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
 
  --- Do we need constraints here ? Is this even a necessary constraint ?
);--done

CREATE TABLE Fall24_S003_T5_FemaLetter(
  Building_id VARCHAR(20) NOT NULL,
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
    ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
 	 
);--done

CREATE TABLE Fall24_S003_T5_Apartment(
  Aid GENERATED ALWAYS AS (Building_id || '-A' || Apt_no) VIRTUAL,
  Apt_no INTEGER NOT NULL,
  Floor_no INTEGER NOT NULL,
  Num_of_bedrooms INTEGER NOT NULL,
  Num_of_bathrooms INTEGER NOT NULL,
  Total_sqft FLOAT NOT NULL,
  Pet_friendly CHAR(1) NOT NULL CHECK (Pet_friendly IN ('Y', 'N')),
  Smoking CHAR(1) NOT NULL CHECK (Smoking IN ('Y', 'N')),
  Furnished CHAR(1) NOT NULL CHECK (Furnished IN ('Y', 'N')),
  Rent INTEGER NOT NULL,
  Building_id VARCHAR(20) NOT NULL,
 
  PRIMARY KEY (Aid),
 
  CONSTRAINT APT_BUILDING_ID_FK
	 FOREIGN KEY (Building_id) REFERENCES Fall24_S003_T5_Building(Bid)
  	ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
 
  -- What constraints are needed here ? is this even necessary? maybe set a default value
); --done

CREATE TABLE Fall24_S003_T5_AppliesTo(
  Complex_id CHAR(12) NOT NULL,
  App_ssn CHAR(9) NOT NULL,
  Num_of_bedrooms INTEGER NOT NULL,
  Num_of_bathrooms INTEGER NOT NULL,
  Applied_date DATE NOT NULL,
 
  PRIMARY KEY (Complex_id, App_ssn),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid),
 
  CONSTRAINT APP_SSN_FK
	 FOREIGN KEY (App_ssn) REFERENCES Fall24_S003_T5_Applicant(Applicant_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE we need triggers for on update cascade
 
 ); --done
 
CREATE TABLE Fall24_S003_T5_Resident(
  Res_ssn CHAR(9) NOT NULL,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Apt_id VARCHAR(30) NOT NULL,
 
  PRIMARY KEY (Res_ssn),
 
  CONSTRAINT RES_SSN_FK
	 FOREIGN KEY (Res_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
  	ON DELETE CASCADE, --ON UPDATE CASCADE,
 	 
  CONSTRAINT APT_ID_FK
	 FOREIGN KEY (Apt_id) REFERENCES Fall24_S003_T5_Apartment(Aid)
  	ON DELETE CASCADE --ON UPDATE CASCADE
);--done

CREATE TABLE Fall24_S003_T5_Car(
  License_plate VARCHAR(8) NOT NULL,
  Make VARCHAR(25),
  Model VARCHAR(25),
  Year CHAR(4),
  Resident_ssn CHAR(9) NOT NULL,
 
  PRIMARY KEY (License_plate),
 
  CONSTRAINT RESIDENT_SSN_FK
	 FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE
 	 
  -- Here should we make the primary key license plate and res ssn?
  -- if the resident leaves and we delete from the person table how do we remove their vehicle from the db as well
  -- Would a trigger or assertion work ?
); --done

CREATE TABLE Fall24_S003_T5_ParkingLot(
  Lot_no CHAR(1) NOT NULL,
  Complex_id CHAR(12) NOT NULL,
 
  PRIMARY KEY(Lot_no, Complex_id),
 
  CONSTRAINT PARKING_COMPLEX_ID_FK
	 FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
  	ON DELETE CASCADE --ON UPDATE CASCADE
);--done

CREATE TABLE Fall24_S003_T5_ParkingSpot(
  Parent_lot_no CHAR(1) NOT NULL,
  Parent_complex_id CHAR(12) NOT NULL,
  Spot_no VARCHAR(2) NOT NULL,
  Occupancy CHAR(1) NOT NULL,
  Parking_type VARCHAR(20) NOT NULL CHECK (Parking_type IN ('Covered', 'Uncovered', 'Garage', 'Handicap')),
 
  PRIMARY KEY (Parent_lot_no,Parent_complex_id,Spot_no),
 
  CONSTRAINT PARENT_LOT_NO_FK
	 FOREIGN KEY (Parent_lot_no, Parent_complex_id) REFERENCES Fall24_S003_T5_ParkingLot(Lot_no,Complex_id)
  	ON DELETE CASCADE --ON UPDATE CASCADE
); -- done with some changes

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
   	  ON DELETE CASCADE,
     --ON UPDATE CASCADE,
 
   -- CONSTRAINT ASSIGNEDLOTNO_FK
 	 -- FOREIGN KEY (Assigned_lot_no) REFERENCES Fall24_S003_T5_ParkingSpot(Parent_lot_no)
   --  	ON DELETE CASCADE,
  	 --on update cascade needs did not work we need trigger here, are we accounting that we can change the parking spot?, that is the only 
     --reason the parking lot will get updated 

   --CONSTRAINT ASSIGNEDSPOTNO_FK
 	  --FOREIGN KEY (Assigned_spot_no) REFERENCES Fall24_S003_T5_ParkingSpot(Spot_no)
     --	ON DELETE CASCADE --ON UPDATE CASCADE
     
  CONSTRAINT ASSIGNED_PARKING_FK
    FOREIGN KEY (Assigned_lot_no, Assigned_complex_id, Assigned_spot_no) REFERENCES Fall24_S003_T5_ParkingSpot(Parent_lot_no, Parent_complex_id, Spot_no)
      ON DELETE CASCADE
); 

CREATE TABLE Fall24_S003_T5_RentPayment(
  Resident_ssn CHAR(9) NOT NULL,
  Due_date DATE NOT NULL,
  Date_paid DATE NOT NULL,
 
  PRIMARY KEY (Resident_ssn, Due_date, Date_paid),
 
  CONSTRAINT RENT_RESIDENTSSN_FK
	 FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE  
); --done

CREATE TABLE Fall24_S003_T5_MaintenanceTicket(
  Ticket_no INTEGER NOT NULL,
  Resident_ssn CHAR(9) NOT NULL,
  Apt_id VARCHAR(30) NOT NULL,
  Ticket_item VARCHAR(25) NOT NULL,
  Ticket_category VARCHAR(25) NOT NULL,
  Ticket_severity VARCHAR(25) NOT NULL,
  Date_submitted DATE NOT NULL,
 
  PRIMARY KEY (Apt_id, Resident_ssn, Ticket_no),
 
  CONSTRAINT MAINTENANCE_APTID_FK
	 FOREIGN KEY (Apt_id) REFERENCES Fall24_S003_T5_Apartment(Aid)
  	ON DELETE CASCADE, --ON UPDATE CASCADE,

  CONSTRAINT MAINTENANCE_RESIDENT_SSN_FK
	 FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
  	ON DELETE CASCADE --ON UPDATE CASCADE
); --done 

CREATE TABLE Fall24_S003_T5_WorksOn(
  Ticket_apt_id VARCHAR(30) NOT NULL,
  Ticket_no INTEGER NOT NULL,
  Worker_ssn CHAR(9) NOT NULL,
  Resident_ssn CHAR(9) NOT NULL,
  Date_submitted DATE NOT NULL,
 
  PRIMARY KEY (Worker_ssn, Resident_ssn, Ticket_no),
 
  CONSTRAINT WRKS_WORKER_SSN_FK
	 FOREIGN KEY (Worker_ssn, Date_submitted) REFERENCES Fall24_S003_T5_MaintenanceStaff(Maintenance_emp_ssn, Shift_date)
  	ON DELETE CASCADE, --ON UPDATE CASCADE,
 
  CONSTRAINT WRKS_RESIDENTSSN_FK
	 FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
  	ON DELETE CASCADE, --ON UPDATE CASCADE,
 
  CONSTRAINT WRKS_TICKETNO_FK
	 FOREIGN KEY (Ticket_apt_id ,Resident_ssn,Ticket_no) REFERENCES Fall24_S003_T5_MaintenanceTicket(Apt_id, Resident_ssn, Ticket_no)
  	ON DELETE CASCADE --ON UPDATE CASCADE
);

-- Trigger for Person table update
CREATE OR REPLACE TRIGGER Person_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Person
FOR EACH ROW
BEGIN
    -- Update Applicant table
    UPDATE Fall24_S003_T5_Applicant
    SET Applicant_ssn = :NEW.Ssn
    WHERE Fall24_S003_T5_Applicant.Applicant_ssn = :OLD.Ssn;
    
    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related applicant record found for person_id = ' || :OLD.Ssn);
    END IF;

    -- Update Employee table
    UPDATE Fall24_S003_T5_Employee
    SET Emp_ssn = :NEW.Ssn
    WHERE Fall24_S003_T5_Employee.Emp_ssn = :OLD.Ssn;
    
    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related employee record found for person_id = ' || :OLD.Ssn);
    END IF;

    -- Update Resident table
    UPDATE Fall24_S003_T5_Resident
    SET Res_ssn = :NEW.Ssn
    WHERE Fall24_S003_T5_Resident.Res_ssn = :OLD.Ssn;
    
    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related resident record found for person_id = ' || :OLD.Ssn);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Person_update_trg: ' || SQLERRM);
END;
/

-- Trigger for Employee table update
CREATE OR REPLACE TRIGGER Employee_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Employee
FOR EACH ROW
BEGIN
    -- Update HourlyEmployee table
    UPDATE Fall24_S003_T5_HourlyEmployee
    SET Hourly_emp_ssn = :NEW.Emp_ssn
    WHERE Hourly_emp_ssn = :OLD.Emp_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related HourlyEmployee record found for employee_ssn = ' || :OLD.Emp_ssn);
    END IF;

    -- Update SalaryEmployee table
    UPDATE Fall24_S003_T5_SalaryEmployee
    SET Salary_emp_ssn = :NEW.Emp_ssn
    WHERE Salary_emp_ssn = :OLD.Emp_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related SalaryEmployee record found for employee_ssn = ' || :OLD.Emp_ssn);
    END IF;

    -- Update OfficeWorker table
    UPDATE Fall24_S003_T5_OfficeWorker
    SET Office_emp_ssn = :NEW.Emp_ssn
    WHERE Office_emp_ssn = :OLD.Emp_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related OfficeWorker record found for employee_ssn = ' || :OLD.Emp_ssn);
    END IF;

    -- Update MaintenanceStaff table
    UPDATE Fall24_S003_T5_MaintenanceStaff
    SET Maintenance_emp_ssn = :NEW.Emp_ssn
    WHERE Maintenance_emp_ssn = :OLD.Emp_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related MaintenanceStaff record found for employee_ssn = ' || :OLD.Emp_ssn);
    END IF;

    -- Update Employee supervisor relationship
    UPDATE Fall24_S003_T5_Employee
    SET Super_ssn = :NEW.Emp_ssn
    WHERE Super_ssn = :OLD.Emp_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related supervisor record found for employee_ssn = ' || :OLD.Emp_ssn);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Employee_update_trg: ' || SQLERRM);
END;
/

-- Trigger for Complex table update
CREATE OR REPLACE TRIGGER Complex_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Complex
FOR EACH ROW
BEGIN
    -- Update Provides table
    UPDATE Fall24_S003_T5_Provides
    SET Complex_id = :NEW.Cid
    WHERE Complex_id = :OLD.Cid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related Provides record found for complex_id = ' || :OLD.Cid);
    END IF;

    -- Update Building table
    UPDATE Fall24_S003_T5_Building
    SET Complex_id = :NEW.Cid
    WHERE Complex_id = :OLD.Cid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related Building record found for complex_id = ' || :OLD.Cid);
    END IF;

    -- Update ParkingLot table
    UPDATE Fall24_S003_T5_ParkingLot
    SET Complex_id = :NEW.Cid
    WHERE Complex_id = :OLD.Cid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related ParkingLot record found for complex_id = ' || :OLD.Cid);
    END IF;

    -- Update AppliesTo table
    UPDATE Fall24_S003_T5_AppliesTo
    SET Complex_id = :NEW.Cid
    WHERE Complex_id = :OLD.Cid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related AppliesTo record found for complex_id = ' || :OLD.Cid);
    END IF;

    -- Update Employee complex information
    UPDATE Fall24_S003_T5_Employee
    SET Complex_id = :NEW.Cid
    WHERE Complex_id = :OLD.Cid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related Employee record found for complex_id = ' || :OLD.Cid);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Complex_update_trg: ' || SQLERRM);
END;
/

-- Trigger for Amenity table update
CREATE OR REPLACE TRIGGER Amenity_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Amenity
FOR EACH ROW
BEGIN
    -- Update Provides table
    UPDATE Fall24_S003_T5_Provides
    SET Amen_type = :NEW.Amenity_type
    WHERE Amen_type = :OLD.Amenity_type;
    
    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related Provides record found for Amenity_type = ' || :OLD.Amenity_type);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Amenity_update_trg: ' || SQLERRM);
END;
/

-- Trigger for Building table update
CREATE OR REPLACE TRIGGER Building_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Building
FOR EACH ROW
BEGIN
    -- Update FemaLetter table
    UPDATE Fall24_S003_T5_FemaLetter
    SET Building_id = :NEW.Bid
    WHERE Building_id = :OLD.Bid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related FemaLetter record found for Building_id = ' || :OLD.Bid);
    END IF;

    -- Update Apartment table
    UPDATE Fall24_S003_T5_Apartment
    SET Building_id = :NEW.Bid
    WHERE Building_id = :OLD.Bid;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related Apartment record found for Building_id = ' || :OLD.Bid);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Building_update_trg: ' || SQLERRM);
END;
/

-- Trigger for ParkingLot table update
CREATE OR REPLACE TRIGGER Parking_lot_update_trg
AFTER UPDATE
ON Fall24_S003_T5_ParkingLot
FOR EACH ROW
BEGIN
    -- Update ParkingSpot table
    UPDATE Fall24_S003_T5_ParkingSpot
    SET Parent_lot_no = :NEW.Lot_no
    WHERE Parent_lot_no = :OLD.Lot_no;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related ParkingSpot record found for Lot_no = ' || :OLD.Lot_no);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Parking_lot_update_trg: ' || SQLERRM);
END;
/

-- Trigger for Applicant table update
CREATE OR REPLACE TRIGGER Applicant_update_trg
AFTER UPDATE
ON Fall24_S003_T5_Applicant
FOR EACH ROW
BEGIN
    -- Update AppliesTo table
    UPDATE Fall24_S003_T5_AppliesTo
    SET App_ssn = :NEW.Applicant_ssn
    WHERE App_ssn = :OLD.Applicant_ssn;

    -- Check if the update was successful
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No related AppliesTo record found for Applicant_ssn = ' || :OLD.Applicant_ssn);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred in Applicant_update_trg: ' || SQLERRM);
END;
