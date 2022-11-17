create table "users"
(
	id uuid not null primary key,
	"email" varchar(128) not null unique,
	"firstName" varchar(128) not null,
	"lastName" varchar(128) not null,
    "password" varchar(256) not null
);