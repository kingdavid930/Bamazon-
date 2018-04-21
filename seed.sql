drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
item_id int auto_increment not null,
product_name varchar(20) not null,
department_name varchar(20) not null,
price int(100) not null,
stock_quantity int (30) not null,

primary key (item_id)

);



insert into products(product_name, department_name, price, stock_quantity)
values
	("shoes", "nike", 50, 5),
    ("shirts", "reebook", 25, 10),
    ("shorts", "under armour", 45, 7),
    ("socks","nike", 10, 20),
    ("jerserys", "addidas", 50, 4),
    ("headband","reebok", 6, 10),
    ("duffle_bag","nike", 50, 3),
    ("compression_shirts","nike",30, 12),
    ("compression_shorts", "nike", 40, 8),
    ("watch","nike", 50, 0);