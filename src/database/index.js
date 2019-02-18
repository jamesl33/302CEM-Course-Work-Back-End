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

'use strict'

const fs = require('fs')
const sqlite = require('better-sqlite3')

const sensors = require('./sensors.js')

const config = require('../config')

module.exports = Object.assign({}, {
    createDatabase: () => {
        const db = new sqlite(config.database.name)

        db.prepare('create table sensors (id integer primary key not null, type text not null)').run()
        db.prepare('create table history (id integer not null, timestamp integer not null, value integer, foreign key(id) references sensors(id))').run()

        db.close()
    },
    sensors: sensors
})

if (!fs.existsSync(config.database.name)) {
    module.exports.createDatabase()
}
