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
    id          INT NOT NULL AUTO_INCREMENT,
    post_id     INT NOT NULL,
    user_id     INT NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP NOT NULL,
    CONSTRAINT pk_comment PRIMARY KEY(id),
    CONSTRAINT comment_post FOREIGN KEY(post_id) REFERENCES posts(id),
    CONSTRAINT comment_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE attempts(
    id          INT NOT NULL AUTO_INCREMENT,
    post_id     INT NOT NULL,
    user_id     INT NOT NULL,
    unlocked  BOOLEAN NOT NULL,
    CONSTRAINT pk_attempt PRIMARY KEY(id),
    CONSTRAINT attempt_post FOREIGN KEY(post_id) REFERENCES posts(id),
    CONSTRAINT attempt_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE reset_password_token(
    id              int not null AUTO_INCREMENT,
    token           INT not null,
    expired_at      TIMESTAMP not null,
    user_email      varchar(30) not null,
    CONSTRAINT pk_reset_password_token PRIMARY KEY(id)
);

CREATE TABLE followers(
    id              int not null AUTO_INCREMENT,
    user_id     int not null,
    follower_id    int not null,
    CONSTRAINT pk_followers PRIMARY KEY(id),
    CONSTRAINT follorwers_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT follorwers_follower FOREIGN KEY(follower_id) REFERENCES users(id)
);