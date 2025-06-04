-- Create Provider table
CREATE TABLE E_PERSON (
    pers_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nm_first VARCHAR(255) NOT NULL,
    nm_last VARCHAR(255) NOT NULL,
    gndr_cd VARCHAR(10) NOT NULL
);

-- Create C_USER table with a foreign key reference to Provider
CREATE TABLE C_USER (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    subject_id VARCHAR(255) NOT NULL,
    pers_id BIGINT,
    CONSTRAINT fk_user_provider FOREIGN KEY (pers_id) REFERENCES E_PERSON(pers_id) ON DELETE SET NULL
);


-- Insert sample data into Provider table
INSERT INTO E_PERSON (pers_id, nm_first, nm_last, gndr_cd) VALUES
(1, 'John', 'Doe', 'M'),
(2, 'Alice', 'Smith', 'F'),
(3, 'Bob', 'Brown', 'M');

-- Insert sample data into ADMIN table, linking some admins to providers
INSERT INTO C_USER (user_id, username, email_id, subject_id, pers_id) VALUES
(101, 'admin1', 'admin1@example.com', 'c1eb05f0-80c1-70f7-984a-5e5c3c5cbb2a', 1), -- Linked to provider 1
(102, 'admin2', 'admin2@example.com', 'sub456', 2), -- Linked to provider 2
(103, 'admin3', 'admin3@example.com', 'sub123', NULL), -- No linked provider
(104, 'admin4', 'admin4@example.com', 'sub101', NULL), -- No linked provider
(105, 'admin5', 'admin5@example.com', 'sub122', NULL);  -- No linked provider
