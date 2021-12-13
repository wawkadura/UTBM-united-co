create database united;

create table users (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(20),
  lastname varchar(20),
  email varchar(320),
  password varchar(100),
  role varchar(20),
  email_verified_at datetime
)ENGINE=InnoDB ;

create table association (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(50),
   acronym varchar(10),
   type varchar(20),
   email varchar(320),
   description varchar(200),
   address varchar(50),
   city varchar(50),
   website varchar(200),
   telephone varchar(12),
   state boolean,
   created_at datetime,
   users_id int unique,
   PRIMARY key(id)
)ENGINE=InnoDB ;

create table service (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100),
  description varchar(500),
  price int,
  state boolean,
  association_id int not null,
  PRIMARY key(id),
  FOREIGN KEY (association_id) REFERENCES association(id)
)ENGINE=InnoDB ;

create table subscription (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  price int,
  date datetime,
  duration int,
  state boolean,
  users_id int not null,
  service_id int not null,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES service(id)
)ENGINE=InnoDB ;

create table ticket (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type varchar(100),
  comment varchar(500),
  pickup_date datetime,
  resolved_date datetime,
  created_at datetime,
  users_id int not null,
  support_id int not null,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (support_id) REFERENCES users(id)
)ENGINE=InnoDB ;

create table payment (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  iban varchar(50),
  card_number int,
  expire_date date,
  users_id int not null,
  FOREIGN KEY (users_id) REFERENCES users(id)
)ENGINE=InnoDB ;

create table image (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  image BLOB,
  ticket_id int not null,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
)ENGINE=InnoDB ;

create table password_reset (
  email varchar(320),
  token varchar(200),
  created_at datetime
)ENGINE=InnoDB ;

create table favorites (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id int not null,
  association_id int not null,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (association_id) REFERENCES association(id)
)ENGINE=InnoDB ;
