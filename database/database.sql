CREATE DATABASE dbtask;

USE dbtask;

CREATE TABLE task (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    start_date datetime,
	duration int(11),
    time_current time,
    estatus varchar(3)
);

CREATE TABLE statustask (
    id varchar(3) NOT NULL PRIMARY KEY,
    description VARCHAR(255)
);

INSERT INTO `statustask` VALUES ('C','Completa',2),('P','Pendiente',1);
DESCRIBE task;