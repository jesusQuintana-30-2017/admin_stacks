CREATE DATABASE dbtask;

USE dbtask;

CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `final_date` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `time_current` int(11) DEFAULT NULL,
  `estatus` varchar(3) DEFAULT NULL,
  `time_total` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `statustask` (
  `id` varchar(3) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `statustask` VALUES ('C','Completa',2),('P','Pendiente',1);
DESCRIBE task;