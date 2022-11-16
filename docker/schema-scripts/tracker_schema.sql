create table "user"
(
	id int(11) not null primary key AUTO_INCREMENT,
	"email" varchar(128) not null unique,
	"firstName" varchar(128) not null,
	"lastName" varchar(128) not null,
    "password" varchar(256) not null
);