create database cabinet;
create user 'avocat'@'localhost' identified by 'avocat';
grant all privileges on cabinet.* to 'avocat'@'localhost';
