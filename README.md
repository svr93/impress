Проект по СУБД
=======

https://github.com/tshemsedinov - разработчик сервера Impress, используемого в проекте

Настройки:

1) applications/sqlproject/config/databases.js - конфиг для БД (не используется в полной мере);

2) node_modules/impress/lib/impress.js (костыль, не самый последний вариант):

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
3) использование затем подключения (2 варианта):

                var connection = impress.conn; //использование костыля
                var connection = client.application.databases.<connection_name_in_databases.js>.connection;
