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
const infrared = require('./infrared')
const light = require('./light')

module.exports = {
    /**
     * @description Add a new sensor to the database
     * @param {Object} sensor - The sensor to be added to the database
     */
    add: (sensor) => {
        const db = new sqlite(config.database.name)

        db.prepare('insert into sensors values(?, ?)').run(sensor.id, sensor.type)

        switch (sensor.type) {
            case 'infrared':
                db.prepare('insert into infrared values(?, 60)').run(sensor.id)
                break;
            case 'light':
                db.prepare('insert into light values(?, 10000)').run(sensor.id)
                break;
        }

        db.close()
    },
    /**
     * @description Search the database for a sensor
     * @param {Integer} - A sensor object
     */
    find: (sensor) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select * from sensors where id = ? and type = ?').get(sensor.id, sensor.type)

        db.close()

        if (row === undefined) {
            throw new Error('Sensor doesn\'t exist')
        }

        return row
    },
    /**
     * @description Get all the user defined preferences for the sensors
     */
    preferences: () => {
        const db = new sqlite(config.database.name)

        const light_sensors = db.prepare('select * from light').all()
        const infrared_sensors = db.prepare('select * from infrared').all()

        db.close()

        const preferences = {
            light: {}
        }

        if (light_sensors !== undefined) {
            Object.assign(preferences, {
                light: light_sensors
            })
        }

        if (infrared_sensors !== undefined) {
            Object.assign(preferences, {
                infrared: infrared_sensors
            })
        }

        return preferences
    },
    history: history,
    infrared: infrared,
    light: light
}
