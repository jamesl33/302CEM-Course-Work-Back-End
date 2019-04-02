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
const temperature = require('./temperature')

module.exports = {
    /**
     * @description Add a new sensor to the database
     * @param {Object} sensor - The sensor to be added to the database
     */
    add: (sensor) => {
        return new Promise((resolve) => {
            const db = new sqlite(config.database.name)

            db.prepare('insert into sensors values(?, ?)').run(sensor.id, sensor.type)

            switch (sensor.type) {
                case 'infrared':
                    db.prepare('insert into infrared values(?, 50)').run(sensor.id)
                    break;
                case 'light':
                    db.prepare('insert into light values(?, 10000)').run(sensor.id)
                    break;
                case 'temperature':
                    db.prepare('insert into temperature values(?, 16, 24)').run(sensor.id)
                    break;
            }

            db.close()
            resolve()
        })
    },
    /**
     * @description Search the database for a sensor
     * @param {Integer} - A sensor object
     */
    find: (sensor) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const dbSensor = db.prepare('select * from sensors where id = ? and type = ?').get(sensor.id, sensor.type)

            db.close()

            if (!dbSensor) {
                reject(new Error('Sensor doesn\'t exist'))
            }

            resolve(dbSensor)
        })
    },
    /**
     * @description Get all the user defined preferences for the sensors
     */
    preferences: () => {
        return new Promise((resolve) => {
            const db = new sqlite(config.database.name)

            const infrared_sensors = db.prepare('select * from infrared').all()
            const light_sensors = db.prepare('select * from light').all()
            const temperature_sensors = db.prepare('select * from temperature').all()

            db.close()

            const preferences = {
                light: {}
            }

            if (infrared_sensors !== undefined) {
                Object.assign(preferences, {
                    infrared: infrared_sensors
                })
            }

            if (light_sensors !== undefined) {
                Object.assign(preferences, {
                    light: light_sensors
                })
            }

            if (temperature_sensors !== undefined) {
                Object.assign(preferences, {
                    temperature: temperature_sensors
                })
            }

            resolve(preferences)
        })
    },
    history: history,
    infrared: infrared,
    light: light,
    temperature: temperature
}
