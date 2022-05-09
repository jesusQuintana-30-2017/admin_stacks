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

CREATE TABLE `statustask` (
  `id` varchar(3) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `statustask` VALUES ('C','Completa',2),('P','Pendiente',1);
DESCRIBE task;