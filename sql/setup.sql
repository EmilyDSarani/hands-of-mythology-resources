-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS greeks, norses, egyptians, persians, japaneses;

CREATE TABLE greeks(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    roman_name TEXT NOT NULL
);
INSERT INTO greeks (name, title, roman_name)
VALUES (
    'Zeus',
    'God of Thunder',
    'Jupiter'
);
CREATE TABLE norses(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    characteristic TEXT NOT NULL,
    power TEXT NOT NULL
);
INSERT INTO norses (name, characteristic, power)
VALUES (
    'Odin',
    'One-Eye',
    'God of War, Poetry, and Magic'
);
CREATE TABLE egyptians(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    animal TEXT NOT NULL
);
INSERT INTO egyptians (name, title, animal)
VALUES (
    'Horus',
    'the Avenger',
    'Falcon'
);
CREATE TABLE persians(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    fun_fact TEXT NOT NULL
);
INSERT INTO persians (name, title, fun_fact)
VALUES (
    'Atar',
    'God of Fire and Element itself',
    'Depicted as flames'
);
CREATE TABLE japaneses(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    fun_fact TEXT NOT NULL
);
INSERT INTO japaneses (name, title, fun_fact)
VALUES (
    'Inari',
    'Protector of Rice Cultivation',
    'Uses foxes as messengers'
);