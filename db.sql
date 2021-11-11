CREATE DATABASE SocialCube;

USE SocialCube;

--Cambios en las contraint de users
CREATE TABLE users(
id          int not null auto_increment,
name        varchar(70) not null,
surname     varchar(70) not null,
nickname    varchar(70) not null,
image_uuid  varchar(255),
email       varchar(30) not null,
password    varchar(255) not null,
biography   TEXT,
created_at  timestamp not null,
updated_at  timestamp not null,
CONSTRAINT pk_users PRIMARY KEY(id),
CONSTRAINT uq_users UNIQUE(email),
CONSTRAINT uq_users_nickname UNIQUE(nickname)
);

CREATE TABLE chats(
id          int not null auto_increment,
send_to     varchar(70) not null,
from_to     varchar(70) not null,
created_at  timestamp not null,
updated_at  timestamp not null,
mesagge     LONGTEXT not null,
CONSTRAINT pk_chats PRIMARY KEY(id)
);


CREATE TABLE posts(
id          int not null auto_increment,
user_id     int not null,
key_secret  varchar(255),
description TEXT,
content     LONGTEXT not null,
created_at  timestamp not null,
updated_at  timestamp not null,
CONSTRAINT pk_posts PRIMARY KEY(id),
CONSTRAINT fk_posts_users FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE likes(
id           int not null auto_increment,
post_id      int not null,
user_id      int not null,
CONSTRAINT pk_likes PRIMARY KEY(id),
CONSTRAINT fk_likes_posts FOREIGN KEY(post_id) REFERENCES posts(id),
CONSTRAINT fk_likes_users FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE comments(
id           int not null auto_increment,
post_id      int not null,
user_id      int not null,
content      TEXT not null,
created_at  timestamp not null,
updated_at  timestamp not null,
CONSTRAINT pk_likes PRIMARY KEY(id),
CONSTRAINT fk_likes_posts FOREIGN KEY(post_id) REFERENCES posts(id),
CONSTRAINT fk_likes_users FOREIGN KEY(user_id) REFERENCES users(id)
);