CREATE TABLE Fall24_S003_T5_Amenity (
  Amenity_type VARCHAR(100) NOT NULL,
  PRIMARY KEY (Amenity_type)
);

CREATE TABLE Fall24_S003_T5_Person (
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

CREATE TABLE Fall24_S003_T5_Applicant (
  Applicant_ssn CHAR(9) NOT NULL,
  Num_of_dependents INTEGER NOT NULL,
  Income INTEGER NOT NULL,
  Emp_status VARCHAR(15) NOT NULL CHECK (Emp_status IN ('Employed', 'Unemployed', 'Self-employed')),
  Education_status VARCHAR(25) NOT NULL CHECK (Education_status IN ('Highschool Graduate', 'College Graduate', 'Post Graduate')),
  PRIMARY KEY (Applicant_ssn),
  CONSTRAINT APPLICANT_SSN_FK FOREIGN KEY (Applicant_ssn) REFERENCES Fall24_S003_T5_Person(Ssn)
);

CREATE TABLE Fall24_S003_T5_Employee (
  Emp_ssn CHAR(9) NOT NULL,
  Super_ssn CHAR(9) NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY (Emp_ssn),
  CONSTRAINT EMP_SSN_FK FOREIGN KEY (Emp_ssn) REFERENCES Fall24_S003_T5_Person(Ssn),
  CONSTRAINT SUPER_SSN_FK FOREIGN KEY (Super_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn),
  CONSTRAINT COMPLEX_ID_FK FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
);

CREATE TABLE Fall24_S003_T5_HourlyEmployee (
  Hourly_emp_ssn CHAR(9) NOT NULL,
  Pay_per_hour FLOAT NOT NULL,
  PRIMARY KEY (Hourly_emp_ssn),
  CONSTRAINT HOURLY_EMP_SSN_FK FOREIGN KEY (Hourly_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
);

CREATE TABLE Fall24_S003_T5_SalaryEmployee (
  Salary_emp_ssn CHAR(9) NOT NULL,
  Salary INTEGER NOT NULL,
  PRIMARY KEY (Salary_emp_ssn),
  CONSTRAINT SALARY_EMP_SSN_FK FOREIGN KEY (Salary_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
);

CREATE TABLE Fall24_S003_T5_OfficeWorker (
  Office_emp_ssn CHAR(9) NOT NULL,
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Morning', 'Afternoon', 'Evening', 'On-Call')),
  Shift_date DATE NOT NULL,
  PRIMARY KEY (Office_emp_ssn, Shift_date),
  CONSTRAINT OFFICE_EMP_SSN_FK FOREIGN KEY (Office_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
);

CREATE TABLE Fall24_S003_T5_MaintenanceStaff (
  Maintenance_emp_ssn CHAR(9) NOT NULL,
  Specialty VARCHAR(20) NOT NULL CHECK (Specialty IN ('Electrician', 'HVAC', 'Landscape', 'General Maintenance', 'Pest Control', 'Janitorial')),
  Shift VARCHAR(20) NOT NULL CHECK (Shift IN ('Day', 'On-Call')),
  Shift_date DATE NOT NULL,
  PRIMARY KEY (Maintenance_emp_ssn, Shift_date),
  CONSTRAINT MAINTENANCE_EMP_SSN_FK FOREIGN KEY (Maintenance_emp_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
);

CREATE TABLE Fall24_S003_T5_Complex (
  Cid CHAR(12) NOT NULL,
  Complex_name VARCHAR(25) NOT NULL,
  Street VARCHAR(25) NOT NULL,
  City VARCHAR(25) NOT NULL,
  State CHAR(2) NOT NULL,
  Zip CHAR(5) NOT NULL,
  Mgr_ssn CHAR(9) NULL,
  PRIMARY KEY (Cid),
  CONSTRAINT MGR_SSN_FK FOREIGN KEY (Mgr_ssn) REFERENCES Fall24_S003_T5_Employee(Emp_ssn)
);

CREATE TABLE Fall24_S003_T5_Provides (
  Complex_id CHAR(12) NOT NULL,
  Amen_type VARCHAR(100) NOT NULL,
  Quantity CHAR(10),
  Description VARCHAR(100) NOT NULL,
  PRIMARY KEY (Complex_id, Amen_type),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid),
  CONSTRAINT AMEN_TYPE_FK FOREIGN KEY (Amen_type) REFERENCES Fall24_S003_T5_Amenity(Amenity_type)
);

CREATE TABLE Fall24_S003_T5_Building (
  Bid VARCHAR(20) GENERATED ALWAYS AS (CONCAT(Complex_id, '-B', Building_no)) VIRTUAL,
  Building_no INTEGER NOT NULL,
  Num_of_floors INTEGER NOT NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY (Bid),
  CONSTRAINT BUILDING_COMPLEX_ID_FK FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
);

CREATE TABLE Fall24_S003_T5_FemaLetter (
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
  CONSTRAINT FEMA_BUILDING_ID_FK FOREIGN KEY (Building_id) REFERENCES Fall24_S003_T5_Building(Bid)
);

CREATE TABLE Fall24_S003_T5_Apartment (
  Aid VARCHAR(30) GENERATED ALWAYS AS (CONCAT(Building_id, '-A', Apt_no)) VIRTUAL,
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
  CONSTRAINT APT_BUILDING_ID_FK FOREIGN KEY (Building_id) REFERENCES Fall24_S003_T5_Building(Bid)
);

CREATE TABLE Fall24_S003_T5_AppliesTo (
  Complex_id CHAR(12) NOT NULL,
  App_ssn CHAR(9) NOT NULL,
  Num_of_bedrooms INTEGER NOT NULL,
  Num_of_bathrooms INTEGER NOT NULL,
  Applied_date DATE NOT NULL,
  PRIMARY KEY (Complex_id, App_ssn),
  FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid),
  CONSTRAINT APP_SSN_FK FOREIGN KEY (App_ssn) REFERENCES Fall24_S003_T5_Applicant(Applicant_ssn)
);

CREATE TABLE Fall24_S003_T5_Resident (
  Res_ssn CHAR(9) NOT NULL,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Apt_id VARCHAR(30) NOT NULL,
  PRIMARY KEY (Res_ssn),
  CONSTRAINT RES_SSN_FK FOREIGN KEY (Res_ssn) REFERENCES Fall24_S003_T5_Person(Ssn),
  CONSTRAINT APT_ID_FK FOREIGN KEY (Apt_id) REFERENCES Fall24_S003_T5_Apartment(Aid)
);

CREATE TABLE Fall24_S003_T5_Car (
  License_plate VARCHAR(8) NOT NULL,
  Make VARCHAR(25),
  Model VARCHAR(25),
  Year CHAR(4),
  Resident_ssn CHAR(9) NOT NULL,
  PRIMARY KEY (License_plate),
  CONSTRAINT RESIDENT_SSN_FK FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn)
);

CREATE TABLE Fall24_S003_T5_ParkingLot (
  Lot_no CHAR(1) NOT NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY (Lot_no, Complex_id),
  CONSTRAINT PARKING_COMPLEX_ID_FK FOREIGN KEY (Complex_id) REFERENCES Fall24_S003_T5_Complex(Cid)
);

CREATE TABLE Fall24_S003_T5_ParkingSpot (
  Parent_lot_no CHAR(1) NOT NULL,
  Parent_complex_id CHAR(12) NOT NULL,
  Spot_no VARCHAR(2) NOT NULL,
  Occupancy CHAR(1) NOT NULL,
  Parking_type VARCHAR(20) NOT NULL CHECK (Parking_type IN ('Covered', 'Uncovered', 'Garage', 'Handicap')),
  PRIMARY KEY (Parent_lot_no, Parent_complex_id, Spot_no),
  CONSTRAINT PARENT_LOT_NO_FK FOREIGN KEY (Parent_lot_no, Parent_complex_id) REFERENCES Fall24_S003_T5_ParkingLot(Lot_no, Complex_id)
);

CREATE TABLE Fall24_S003_T5_ParkingPermit (
  Resident_ssn CHAR(9) NOT NULL,
  License_plate VARCHAR(8) NOT NULL,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Spot_no VARCHAR(2) NOT NULL,
  Lot_no CHAR(1) NOT NULL,
  Complex_id CHAR(12) NOT NULL,
  PRIMARY KEY (License_plate, Complex_id),
  CONSTRAINT PERMIT_RESIDENT_SSN_FK FOREIGN KEY (Resident_ssn) REFERENCES Fall24_S003_T5_Resident(Res_ssn),
  CONSTRAINT SPOT_PARKING_FK FOREIGN KEY (Spot_no, Lot_no, Complex_id) REFERENCES Fall24_S003_T5_ParkingSpot(Spot_no, Parent_lot_no, Parent_complex_id)
);