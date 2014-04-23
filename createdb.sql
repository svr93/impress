DROP DATABASE forums;
CREATE DATABASE forums CHARACTER SET 'UTF8';
USE forums;
SET NAMES 'UTF8';

CREATE TABLE User (
	id MEDIUMINT AUTO_INCREMENT, 
	about VARCHAR(40), 
	email VARCHAR(40) NOT NULL UNIQUE, 
	isAnonymous BOOLEAN DEFAULT False, 
	name VARCHAR(40), 
	username VARCHAR(20), 
	PRIMARY KEY(id),
	KEY(email)
);

CREATE TABLE Forum (
	id MEDIUMINT AUTO_INCREMENT, 
	name VARCHAR(80) NOT NULL UNIQUE, 
	short_name VARCHAR(40) NOT NULL UNIQUE, 
	user VARCHAR(40) NOT NULL, 
	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES User(email)
);

CREATE TABLE Thread (
	id MEDIUMINT AUTO_INCREMENT, 
	forum VARCHAR(40) NOT NULL, 
	isClosed BOOLEAN NOT NULL DEFAULT False, 
	isDeleted BOOLEAN NOT NULL DEFAULT False, 
	message VARCHAR(500) NOT NULL, 
	slug VARCHAR(40) NOT NULL, 
	title VARCHAR(80) NOT NULL, 
	user VARCHAR(40) NOT NULL,
	date DATETIME NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(forum) REFERENCES Forum(short_name),
	FOREIGN KEY(user) REFERENCES User(email)
);

CREATE TABLE Post (
	id MEDIUMINT AUTO_INCREMENT, 
	date DATETIME NOT NULL, 
	forum VARCHAR(40) NOT NULL, 
	parent MEDIUMINT, 
	isApproved BOOLEAN NOT NULL DEFAULT False, 
	isDeleted BOOLEAN NOT NULL DEFAULT False, 
	isEdited BOOLEAN NOT NULL DEFAULT False, 
	isHighlighted BOOLEAN NOT NULL DEFAULT False, 
	isSpam BOOLEAN NOT NULL DEFAULT False, 
	message VARCHAR(500) NOT NULL, 
	thread MEDIUMINT NOT NULL, 
	user VARCHAR(40) NOT NULL, 
	PRIMARY KEY(id),
	FOREIGN KEY(parent) REFERENCES Post(id),
	FOREIGN KEY(thread) REFERENCES Thread(id),
	FOREIGN KEY(user) REFERENCES User(email),
	FOREIGN KEY(forum) REFERENCES Forum(short_name)
);

CREATE TABLE Followers (
        follower_id MEDIUMINT NOT NULL,
        target_id MEDIUMINT NOT NULL,
        FOREIGN KEY(follower_id) REFERENCES User(id),
        FOREIGN KEY(target_id) REFERENCES User(id)
);

CREATE TABLE Postrating (
        id MEDIUMINT NOT NULL,
        likes MEDIUMINT NOT NULL DEFAULT 0,
        dislikes MEDIUMINT NOT NULL DEFAULT 0,
        points MEDIUMINT NOT NULL DEFAULT 0,
        FOREIGN KEY(id) REFERENCES Post(id)
);

CREATE TABLE Threadrating (
        id MEDIUMINT NOT NULL,
        likes MEDIUMINT NOT NULL DEFAULT 0,
        dislikes MEDIUMINT NOT NULL DEFAULT 0,
        points MEDIUMINT NOT NULL DEFAULT 0,
        FOREIGN KEY(id) REFERENCES Thread(id)
);

CREATE TABLE Subscribe (
        user_id MEDIUMINT NOT NULL,
        thread_id MEDIUMINT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES User(id),
        FOREIGN KEY(thread_id) REFERENCES Thread(id)
);

