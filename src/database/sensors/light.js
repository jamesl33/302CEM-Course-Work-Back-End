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
     * @description Get the threshold for a light sensor
     * @param {Integer} id - The id of a light sensor in the database
     */
    getThreshold: (id) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from light where id = ?').get(id)

            db.close()

            if (!sensor) {
                reject(new Error('Light sensor doesn\'t exist'))
            }

            resolve(sensor.threshold)
        })
    },
    /**
     * @description Set the threshold for a light sensor
     * @param {Integer} id - The id of the light sensor we are modifying
     * @param {Integer} threshold - The new threshold value
     */
    setThreshold: (id, threshold) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const sensor = db.prepare('select * from light where id = ?').get(id)

            if (!sensor) {
                reject(new Error('Light sensor doesn\'t exist'))
            }

            if (threshold !== sensor.threshold) {
                db.prepare('update light set threshold = ? where id = ?').run(threshold, id)
            }

            db.close()
            resolve()
        })
    }
}
