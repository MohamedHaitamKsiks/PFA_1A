--users
CREATE TABLE user (
    id INT AUTO_INCREMENT ,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    isadmin INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO user (username, password, isadmin) VALUES ('admin', 'admin', 1);

--particulier
CREATE TABLE particulier (
    id INT AUTO_INCREMENT,
    nom VARCHAR(45) NOT NULL,
    prenom VARCHAR(45) NOT NULL,
    cin VARCHAR(20),
    PRIMARY KEY(id)
);

--societe
CREATE TABLE societe (
    id INT  AUTO_INCREMENT,
    nom VARCHAR(45) NOT NULL,
    matricule VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);


--creer dossier pour societe
CREATE TABLE dossierso (
    id INT AUTO_INCREMENT,
    ids INT NOT NULL,
    nature ENUM ('voiture', 'travail'),
    info VARCHAR(256) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (ids) REFERENCES societe(id)
);

--creer dossier pour parti
CREATE TABLE dossierpar (
    id INT AUTO_INCREMENT,
    idp INT NOT NULL,
    nature ENUM ('voiture', 'travail'),
    info VARCHAR(256) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idp) REFERENCES particulier(id)
);

--creer documents
CREATE TABLE documentpar (
    id INT AUTO_INCREMENT,
    iddp INT NOT NULL,
    nature ENUM ('pv', 'photos', 'med', 'contremed', 'autre'),
    chemin VARCHAR(80),
    PRIMARY KEY(id),
    FOREIGN KEY (iddp) REFERENCES dossierpar(id)
);

CREATE TABLE documentso (
    id INT AUTO_INCREMENT,
    idds INT NOT NULL,
    nature ENUM ('pv', 'photos', 'med', 'contremed', 'autre'),
    chemin VARCHAR(80),
    PRIMARY KEY(id),
    FOREIGN KEY (idds) REFERENCES dossierso(id)
);

ALTER TABLE particulier ADD COLUMN cin Varchar(25);
ALTER TABLE particulier MODIFY COLUMN cin Varchar(25) DEFAULT 'unknown';