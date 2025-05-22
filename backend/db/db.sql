-- Amenity Types
CREATE TABLE amenities (
    amenity_type VARCHAR(10) PRIMARY KEY
);

-- Person Information
CREATE TABLE persons (
    ssn VARCHAR(9) PRIMARY KEY,
    fname VARCHAR(20) NOT NULL,
    minit CHAR(1),
    lname VARCHAR(20) NOT NULL,
    gender VARCHAR(20),
    ethnicity VARCHAR(20),
    contact VARCHAR(10) NOT NULL,
    marital_status VARCHAR(10)
);

-- Applicant Information
CREATE TABLE applicants (
    applicant_ssn VARCHAR(9) PRIMARY KEY,
    num_of_dependents INT NOT NULL,
    income INT NOT NULL,
    emp_status VARCHAR(15),
    education_status VARCHAR(25),
    FOREIGN KEY (applicant_ssn) REFERENCES persons(ssn) ON DELETE CASCADE
);

-- Complex Information
CREATE TABLE complexes (
    complex_id VARCHAR(12) PRIMARY KEY,
    complex_name VARCHAR(25) NOT NULL,
    street VARCHAR(25) NOT NULL,
    city VARCHAR(25) NOT NULL,
    state CHAR(2) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    mgr_ssn VARCHAR(9) NOT NULL DEFAULT '000000000'
);

-- Employee Information
CREATE TABLE employees (
    emp_ssn VARCHAR(9) PRIMARY KEY,
    super_ssn VARCHAR(9),
    complex_id VARCHAR(13) NOT NULL DEFAULT '0',
    FOREIGN KEY (emp_ssn) REFERENCES persons(ssn) ON DELETE CASCADE,
    FOREIGN KEY (super_ssn) REFERENCES employees(emp_ssn) ON DELETE SET NULL,
    FOREIGN KEY (complex_id) REFERENCES complexes(complex_id) ON DELETE CASCADE
);

-- Hourly Employees
CREATE TABLE hourly_employees (
    hourly_emp_ssn VARCHAR(9) PRIMARY KEY,
    pay_per_hour DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (hourly_emp_ssn) REFERENCES employees(emp_ssn) ON DELETE CASCADE
);

-- Salary Employees
CREATE TABLE salary_employees (
    salary_emp_ssn VARCHAR(9) PRIMARY KEY,
    salary INT NOT NULL,
    FOREIGN KEY (salary_emp_ssn) REFERENCES employees(emp_ssn) ON DELETE CASCADE
);

-- Office Employees
CREATE TABLE office_employees (
    office_emp_ssn VARCHAR(9) PRIMARY KEY,
    shift VARCHAR(20),
    FOREIGN KEY (office_emp_ssn) REFERENCES employees(emp_ssn) ON DELETE CASCADE
);

-- Maintenance Employees
CREATE TABLE maintenance_employees (
    maintenance_emp_ssn VARCHAR(9) PRIMARY KEY,
    specialty VARCHAR(20),
    FOREIGN KEY (maintenance_emp_ssn) REFERENCES employees(emp_ssn) ON DELETE CASCADE
);

-- Complex Properties
CREATE TABLE properties (
    complex_id VARCHAR(12),
    amen_type VARCHAR(10),
    quantity INT,
    description VARCHAR(100) NOT NULL,
    PRIMARY KEY (complex_id, amen_type),
    FOREIGN KEY (complex_id) REFERENCES complexes(complex_id) ON DELETE CASCADE,
    FOREIGN KEY (amen_type) REFERENCES amenities(amenity_type) ON DELETE CASCADE
);

-- Buildings
CREATE TABLE buildings (
    building_id VARCHAR(20) PRIMARY KEY,
    building_no INT NOT NULL,
    num_of_floors INT NOT NULL,
    complex_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (complex_id) REFERENCES complexes(complex_id) ON DELETE CASCADE
);

-- FEMA Information
CREATE TABLE fema_info (
    building_id VARCHAR(20) PRIMARY KEY,
    case_no VARCHAR(20) NOT NULL,
    lot_no INT,
    block_no INT,
    section_no INT,
    subdivision VARCHAR(100),
    str_add VARCHAR(100),
    flood_zone VARCHAR(10) NOT NULL,
    base_flood_elev DECIMAL(10,2),
    lowest_adj_grade_elev DECIMAL(10,2),
    lowest_lot_elev DECIMAL(10,2),
    FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE CASCADE
);

-- Apartments
CREATE TABLE apartments (
    apt_id VARCHAR(30) PRIMARY KEY,
    apt_no INT NOT NULL,
    floor_no INT NOT NULL,
    num_of_bedrooms INT NOT NULL,
    num_of_bathrooms DECIMAL(3,1) NOT NULL,
    total_sqft DECIMAL(10,2) NOT NULL,
    pet_friendly CHAR(1),
    smoking CHAR(1),
    furnished CHAR(1),
    rent INT NOT NULL,
    building_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE CASCADE
);

-- Apartment Preferences
CREATE TABLE apartment_preferences (
    complex_id VARCHAR(12),
    app_ssn VARCHAR(9),
    num_of_bedrooms INT NOT NULL,
    num_of_bathrooms INT NOT NULL,
    PRIMARY KEY (complex_id, app_ssn),
    FOREIGN KEY (complex_id) REFERENCES complexes(complex_id) ON DELETE CASCADE,
    FOREIGN KEY (app_ssn) REFERENCES applicants(applicant_ssn) ON DELETE CASCADE
);

-- Residents
CREATE TABLE residents (
    res_ssn VARCHAR(9),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    apt_id VARCHAR(30) NOT NULL,
    PRIMARY KEY (res_ssn, apt_id),
    FOREIGN KEY (res_ssn) REFERENCES persons(ssn) ON DELETE CASCADE,
    FOREIGN KEY (apt_id) REFERENCES apartments(apt_id) ON DELETE CASCADE
);

-- Cars
CREATE TABLE cars (
    license_plate VARCHAR(6) PRIMARY KEY,
    make VARCHAR(10),
    model VARCHAR(10),
    year VARCHAR(4),
    resident_ssn VARCHAR(9) NOT NULL,
    FOREIGN KEY (resident_ssn) REFERENCES residents(res_ssn) ON DELETE CASCADE
);

-- Parking Lots
CREATE TABLE parking_lots (
    lot_no VARCHAR(1) PRIMARY KEY,
    complex_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (complex_id) REFERENCES complexes(complex_id) ON DELETE CASCADE
);

-- Parking Spots
CREATE TABLE parking_spots (
    parent_lot_no VARCHAR(1),
    spot_no VARCHAR(2),
    occupancy CHAR(1) NOT NULL,
    parking_type VARCHAR(20),
    PRIMARY KEY (parent_lot_no, spot_no),
    FOREIGN KEY (parent_lot_no) REFERENCES parking_lots(lot_no) ON DELETE CASCADE
);

-- Parking Assignments
CREATE TABLE parking_assignments (
    resident_ssn VARCHAR(9),
    license_plate VARCHAR(6),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    assigned_lot_no VARCHAR(1),
    assigned_spot_no VARCHAR(2),
    PRIMARY KEY (resident_ssn, license_plate, assigned_lot_no, assigned_spot_no),
    FOREIGN KEY (resident_ssn) REFERENCES residents(res_ssn) ON DELETE CASCADE,
    FOREIGN KEY (license_plate) REFERENCES cars(license_plate) ON DELETE CASCADE,
    FOREIGN KEY (assigned_lot_no, assigned_spot_no) REFERENCES parking_spots(parent_lot_no, spot_no) ON DELETE CASCADE
);

-- Rent Payments
CREATE TABLE rent_payments (
    resident_ssn VARCHAR(9),
    due_date DATE NOT NULL,
    date_paid DATE NOT NULL,
    PRIMARY KEY (resident_ssn, due_date),
    FOREIGN KEY (resident_ssn) REFERENCES residents(res_ssn) ON DELETE CASCADE
);

-- Maintenance Tickets
CREATE TABLE maintenance_tickets (
    ticket_no INT PRIMARY KEY AUTO_INCREMENT,
    resident_ssn VARCHAR(9) NOT NULL,
    apt_id VARCHAR(30) NOT NULL,
    item VARCHAR(10) NOT NULL,
    category VARCHAR(10) NOT NULL,
    severity VARCHAR(10) NOT NULL,
    date_submitted DATE NOT NULL,
    FOREIGN KEY (resident_ssn) REFERENCES residents(res_ssn) ON DELETE CASCADE,
    FOREIGN KEY (apt_id) REFERENCES apartments(apt_id) ON DELETE CASCADE
);

-- Work Orders
CREATE TABLE work_orders (
    ticket_no INT,
    worker_ssn VARCHAR(9),
    resident_ssn VARCHAR(9) NOT NULL,
    date_submitted DATE,
    PRIMARY KEY (ticket_no, worker_ssn),
    FOREIGN KEY (ticket_no) REFERENCES maintenance_tickets(ticket_no) ON DELETE CASCADE,
    FOREIGN KEY (worker_ssn) REFERENCES maintenance_employees(maintenance_emp_ssn) ON DELETE CASCADE,
    FOREIGN KEY (resident_ssn) REFERENCES residents(res_ssn) ON DELETE CASCADE
);