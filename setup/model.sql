CREATE DATABASE magazin

Drop table categories;
CREATE TABLE categories(
  category_id serial primary key,
	category_name varchar(256) not null unique
);

INSERT INTO categories (category_name) VALUES
('Maishiy texnika'),
('Smartfonlar'),
('Sport anjomlari');

CREATE TABLE products(
  product_id serial primary key,
  category_name varchar(32) not null references categories(category_name),
  productName varchar(256) not null unique,
  price varchar(12) not null,
  shortDesc varchar(100) not null,
  longDesc varchar(400) not null,
  picture text not null
);


INSERT INTO products ( category_name, productName, price, shortDesc, longDesc, picture)VALUES
('Maishiy texnika','Changyutkich','1750000','Changyutgich AVALON AVL – VCC 2248 B ','AVALON changyutgichi turar-joy va jamoat joylarida kimyoviy tozalash uchun','I2UxqfGkKSkktbUBYrkDjgauXit4LXzMam5XTbVEByeVuOS2QvEnQYxwQeyu.jpeg'),
('Maishiy texnika','sovutkich','1750000','Changyutgich AVALON AVL – VCC 2248 B ','AVALON changyutgichi turar-joy va jamoat joylarida kimyoviy tozalash uchun','I2UxqfGkKSkktbUBYrkDjgauXit4LXzMam5XTbVEByeVuOS2QvEnQYxwQeyu.jpeg'),
('Maishiy texnika','dazmol','1750000','Changyutgich AVALON AVL – VCC 2248 B ','AVALON changyutgichi turar-joy va jamoat joylarida kimyoviy tozalash uchun','I2UxqfGkKSkktbUBYrkDjgauXit4LXzMam5XTbVEByeVuOS2QvEnQYxwQeyu.jpeg');
CREATE TABLE users (
  user_id serial primary key,
  username varchar(32) not null unique,
  password varchar(25) not null,
  contact varchar(14) not null,
  email varchar(40) not null,
  role varchar(12) not null
);

INSERT INTO users(username, password , contact, email, role ) VALUES
('admin','admin','+998901049914','donishmand23@gmail.com','admin'),
('Ali','qwerty','+998997777777','ali@gmail.com','user'),
('halil','qwerty1','+998997777774','halil@gmail.com','user'),
('nosir','qwerty2','+998997777775','nosir@gmail.com','user'),
('bobur','qwerty3','+998997777776','bobur@gmail.com','user');

CREATE TABLE orders (
	order_id serial primary key,
	username varchar(32) not null references users(username),
	productName varchar(50) references products(productName),
	is_Paid varchar(12) not null
);
CREATE TABLE statistics(
	totalMoney_paid varchar(256) not null,
	totalMoney_unpaid varchar(256) not null,
	Most_sold int,
	Most_sold int
);