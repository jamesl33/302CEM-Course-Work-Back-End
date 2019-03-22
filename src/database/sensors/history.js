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

module.exports = {
    /**
     * @description Log some sensor data in the database
     * @param {Integer} id - The id of the sensor in the database
     * @param {Integer} data - The value read from the sensor
     */
    log: (id, data) => {
        const db = new sqlite(config.database.name)

        db.prepare('insert into history values (?, ?, ?)').run(id, (new Date).getTime(), data)

        db.close()
    },
    /**
     * @description Fetch a set of historical data from the database by the
     * sensor id.
     * @param {Integer} id - The id of a sensor in the database.
     * @param {Integer} min - The lowest time to be collected from the database.
     * @param {Integer} max - The largest time to be collected from the database.
     */
    byId: (id, min, max) => {
        const db = new sqlite(config.database.name)

        const sensor = db.prepare('select * from sensors where id = ?').get(id)

        if (sensor === undefined) {
            throw new Error('Sensor doesn\'t exist')
        }

        const rows = db.prepare('select timestamp, value from history where id = ? and timestamp > ? and timestamp < ?').all(id, min, max)

        let history = []

        rows.map((row) => {
            history.push(Object.values(row))
        })

        db.close()

        return history
    },
    /**
     * @description Fetch a set of historical data from the database by the
     * sensor type.
     * @param {String} type - A type of sensor stored in the database.
     * @param {Integer} min - The lowest time to be collected from the database.
     * @param {Integer} max - The largest time to be collected from the database.
     */
    byType: (type, min, max) => {
        const db = new sqlite(config.database.name)

        const sensors = db.prepare('select * from sensors where type = ?').all(type)

        if (sensors.length === 0) {
            throw new Error('There are no sensors of type: ' + type)
        }

        const rows = db.prepare('select timestamp, value from history join sensors on history.id = sensors.id where type = ? and timestamp > ? and timestamp < ?').all(type, min, max)

        let history = []

        rows.map((row) => {
            history.push(Object.values(row))
        })

        db.close()

        return history
    }
}
