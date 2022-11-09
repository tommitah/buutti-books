-- UP
create table books (
	id integer PRIMARY KEY,
	title text not null,
	author text not null,
	year integer not null default 9999,
	publisher text,
	description text 
);

-- DOWN
drop table books;
