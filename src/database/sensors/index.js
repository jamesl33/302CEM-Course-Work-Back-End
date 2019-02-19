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

const sqlite = require('better-sqlite3')

const config = require('../../config')

const history = require('./history')
const lights = require('./lights')

module.exports = {
    add: (sensor) => {
        const db = sqlite(config.database.name)

        db.prepare('insert into sensors values(?, ?)').run(sensor.id, sensor.type)

        db.close()
    },
    findById: (id) => {
        const db = sqlite(config.database.name)

        const row = db.prepare('select * from sensors where id = ?').get(id)

        db.close()

        if (row === undefined) {
            throw new Error('Sensor doesn\'t exist')
        }

        return row
    },
    history: history,
    lights: lights
}