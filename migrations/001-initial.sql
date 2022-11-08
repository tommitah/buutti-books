-- UP
create table books (
	id integer PRIMARY KEY,
	title text not null,
	author text not null,
	year integer not null default 9999,
	publisher text not null,
	description text not null 
);

-- DOWN
drop table books;
