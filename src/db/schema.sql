CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE bun_colors (
	id INT NOT NULL AUTO_INCREMENT,
	color VARCHAR(255) NOT NULL,
	bunned BOOLEAN DEFAULT false,
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

INSERT INTO bun_colors (color, bunned)
VALUES ('#512da8', false),
('#0097a7', false),
('#e64a19', false),
('#1976d2', false);
