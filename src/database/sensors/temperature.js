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
     * @description Get the lower threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    getLowerThreshold: (id) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select lowerThreshold from temperature where id = ?').get(id)

            db.close()

            if (!sensor) {
                reject(new Error('Temperature sensor doesn\t exit'))
            }

            resolve(sensor.lowerThreshold)
        })
    },
    /**
     * @description Get the higher threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    getHigherThreshold: (id) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select higherThreshold from temperature where id = ?').get(id)

            db.close()

            if (!sensor) {
                reject(new Error('Temperature sensor doesn\t exit'))
            }

            resolve(sensor.higherThreshold)
        })
    },
    /**
     * @description Get the threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    getThreshold: (id) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from temperature where id = ?').get(id)

            db.close()

            if (!sensor) {
                reject(new Error('Temperature sensor doesn\'t exist'))
            }

            resolve({
                lowerThreshold: sensor.lowerThreshold,
                higherThreshold: sensor.higherThreshold
            })
        })
    },
    /**
     * @description Set the lower threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    setLowerThreshold: (id, threshold) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from temperature where id = ?').get(id)

            if (!sensor) {
                reject(new Error('Temperature sensor doesn\'t exist'))
            }

            if (threshold !== sensor.lowerThreshold) {
                db.prepare('update temperature set lowerThreshold = ? where id = ?').run(threshold, id)
            }

            db.close()
            resolve()
        })
    },
    /**
     * @description Set the higher threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    setHigherThreshold: (id, threshold) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from temperature where id = ?').get(id)

            if (sensor === undefined) {
                reject(new Error('Temperature sensor doesn\'t exist'))
            }

            if (threshold !== sensor.higherThreshold) {
                db.prepare('update temperature set higherThreshold = ? where id = ?').run(threshold, id)
            }

            db.close()
            resolve()
        })
    },
    /**
     * @description Set the threshold for a temperature sensor
     * @param {Integer} id - The id of the temperature sensor we are modifying
     * @param {Integer} lowerThreshold - The new lower threshold value
     * @param {Integer} higherThreshold - The new higher threshold value
     */
    setThreshold: (id, lowerThreshold, higherThreshold) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from temperature where id = ?').get(id)

            if (sensor === undefined) {
                reject(new Error('Temperature sensor doesn\'t exist'))
            }

            if (lowerThreshold !== sensor.lowerThreshold) {
                db.prepare('update temperature set lowerThreshold = ? where id = ?').run(lowerThreshold, id)
            }

            if (higherThreshold !== sensor.higherThreshold) {
                db.prepare('update temperature set higherThreshold = ? where id = ?').run(higherThreshold, id)
            }

            db.close()
            resolve()
        })
    }
}
