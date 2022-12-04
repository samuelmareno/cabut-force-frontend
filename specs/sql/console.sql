CREATE DATABASE cabut_force_db;

USE cabut_force_db;

## User Table

CREATE TABLE user
(
    id         VARCHAR(50) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name       VARCHAR(255),
    email      VARCHAR(255),
    password   VARCHAR(255),
    role       TEXT                    NOT NULL,
    last_login LONG                             DEFAULT NULL,
    created_at LONG                    NOT NULL DEFAULT (UNIX_TIMESTAMP() * 1000)
) ENGINE = InnoDB;

ALTER TABLE user
    ADD COLUMN role TEXT;

INSERT INTO user (name, email, password, role)
VALUES ('Samuel Mareno', 'samuelmareno@bankjateng.co.id', 'haleluya7', 'r'),
       ('Lady Abigael Antono', 'lady.abigael@bankjateng.co.id', 'Giant887', 'd');

SELECT *
FROM user;

## Product Type Table

CREATE TABLE product_type
(
    id   INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

SELECT *
FROM product_type;

INSERT INTO product_type (name)
VALUES ('PLO Horizontal'),
       ('PLO Vertical'),
       ('PLO Pensiunan'),
       ('PLO Swasta'),
       ('KPR'),
       ('KKB'),
       ('KMG');

## Pipeline Table

CREATE TABLE pipeline
(
    id               VARCHAR(50) PRIMARY KEY            NOT NULL DEFAULT (UUID()),
    nip              VARCHAR(50)                        NOT NULL,
    name             VARCHAR(255)                       NOT NULL,
    phone_number     VARCHAR(20),
    address          TEXT,
    status           ENUM ('FOLLOW_UP', 'DEAL', 'LOST') NOT NULL DEFAULT 'FOLLOW_UP',
    product_type_id  INT,
    prospect_date    BIGINT,
    referral_user_id VARCHAR(50),
    CONSTRAINT fk_product_type_id_to_product_type FOREIGN KEY (product_type_id) REFERENCES product_type (id),
    CONSTRAINT fk_ref_user_id_to_user FOREIGN KEY (referral_user_id) REFERENCES user (id)
) ENGINE = InnoDB;

INSERT INTO pipeline(nip, name, phone_number, address, product_type_id, prospect_date, referral_user_id)
VALUES ('123893249', 'Arif Nugroho', '09347723894', 'alksfjsdlfklsdkkfjldffdjslfkdkk', 1, (UNIX_TIMESTAMP() * 1000),
        'f332e9e8-6fb9-11ed-be46-42010ab80002');

SELECT *
FROM pipeline;