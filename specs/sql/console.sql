CREATE DATABASE cabut_force_db;

USE cabut_force_db;

CREATE TABLE user
(
    id         VARCHAR(50) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name       VARCHAR(255),
    email      VARCHAR(255),
    password   VARCHAR(255),
    role TEXT NOT NULL,
    last_login LONG                             DEFAULT NULL,
    created_at LONG                    NOT NULL DEFAULT (UNIX_TIMESTAMP() * 1000)
) ENGINE = InnoDB;

ALTER TABLE user
    ADD COLUMN role TEXT;

INSERT INTO user (name, email, password, role)
VALUES ('Samuel Mareno', 'samuelmareno@bankjateng.co.id', 'haleluya7', 'r'),
       ('Lady Abigael Antono', 'lady.abigael@bankjateng.co.id', 'Giant887', 'd');

SELECT * FROM user;