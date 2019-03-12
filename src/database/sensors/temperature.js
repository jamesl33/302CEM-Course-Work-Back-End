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
        const db = new sqlite(config.database.name)

        const row = db.prepare('select lowerThreshold from temperature where id = ?').get(id)

        db.close()

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\t exit')
        }

        return row.lowerThreshold
    },
    /**
     * @description Get the higher threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    getHigherThreshold: (id) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select higherThreshold from temperature where id = ?').get(id)

        db.close()

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\t exit')
        }

        return row.higherThreshold
    },
    /**
     * @description Get the threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    getThreshold: (id) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select * from temperature where id = ?').get(id)

        db.close()

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\'t exist')
        }

        return {
            lowerThreshold: row.lowerThreshold,
            higherThreshold: row.higherThreshold
        }
    },
    /**
     * @description Set the lower threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    setLowerThreshold: (id, threshold) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select * from sensors where id = ?').get(id)

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\'t exist')
        }

        if (threshold !== row.lowerThreshold) {
            db.prepare('update temperature set lowerThreshold = ? where id = ?').run(threshold, id)
        }

        db.close()
    },
    /**
     * @description Set the higher threshold for a temperature sensor
     * @param {Integer} id - The id of a temperature sensor in the database
     */
    setHigherThreshold: (id, threshold) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select * from sensors where id = ?').get(id)

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\'t exist')
        }

        if (threshold !== row.higherThreshold) {
            db.prepare('update temperature set higherThreshold = ? where id = ?').run(threshold, id)
        }

        db.close()
    },
    /**
     * @description Set the threshold for a temperature sensor
     * @param {Integer} id - The id of the temperature sensor we are modifying
     * @param {Integer} lowerThreshold - The new lower threshold value
     * @param {Integer} higherThreshold - The new higher threshold value
     */
    setThreshold: (id, lowerThreshold, higherThreshold) => {
        const db = new sqlite(config.database.name)

        const row = db.prepare('select * from sensors where id = ?').get(id)

        if (row === undefined) {
            throw new Error('Temperature sensor doesn\'t exist')
        }

        if (lowerThreshold !== row.lowerThreshold) {
            db.prepare('update temperature set lowerThreshold = ? where id = ?').run(lowerThreshold, id)
        }

        if (higherThreshold !== row.higherThreshold) {
            db.prepare('update temperature set higherThreshold = ? where id = ?').run(higherThreshold, id)
        }

        db.close()
    }
}
