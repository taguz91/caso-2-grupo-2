--
-- File generated with SQLiteStudio v3.3.3 on lun. may. 31 12:17:46 2021
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: user
CREATE TABLE user (
    personaId INTEGER NOT NULL,
    apellidos TEXT,
    nombres TEXT,
    correo TEXT,
    rol TEXT,
    token TEXT,
    type INTEGER
  );

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
