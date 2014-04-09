#!/bin/bash
chmod +rwx mongodb/bin/mongod
(./mongodb/bin/mongod > mongod.log) &
(node server.js)
