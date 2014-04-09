Проект по СУБД
=======

https://github.com/tshemsedinov - создатель сервера

Настройки:

1) applications/sqlproject/config/databases.js - конфиг для БД;

2) содержимое /etc/hosts:

127.0.0.1	localhost
127.0.0.1       some.host.ru

3) node_modules/impress/lib/impress.js (костыль):

                //svr93// My database connection
                var mysql = require('mysql'),
                mysqlUtilities = require('mysql-utilities');

                impress.conn = mysql.createConnection({
                    host:     'localhost',
                    user:     'svr93',
                    password: 'passwd',
                    database: 'forums'
                });

                impress.conn.connect();

                mysqlUtilities.upgrade(impress.conn);
                mysqlUtilities.introspection(impress.conn);

                impress.conn.slowTime = 100; // ms

                //svr93// end
