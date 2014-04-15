#!/bin/bash
chmod +rwx mongodb/bin/mongod
service mysql restart
(./mongodb/bin/mongod > mongod.log) &
(node server.js)
