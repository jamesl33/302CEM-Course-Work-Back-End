#!/usr/bin/env node

/* This file is a part of 302CEM-Course-Work-Back-End.

Copyright (C) 2019 James Lee <jamesl33info@gmail.com>.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const fs = require('fs')

module.exports = {
    database: {
        name: 'sensor-data.sqlite3'
    },
    server: {
        port: 8080
    },
    mqtt: {
        cert: fs.readFileSync('mqtt.coventry.ac.uk.crt'),
        host: 'mqtt.coventry.ac.uk',
        password: 'n3fXXFZrjw',
        port: 8883,
        protocol: 'mqtts',
        username: '302CEM'
    }
}
