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
    lastOn: () => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const row = db.prepare('select max(history.timestamp) from sensors join history on sensors.id = history.id where sensors.type = "infrared" and history.value != 0').get()

            db.close()

            if (!row) {
                reject(new Error('Infrared sensor doesn\'t exist'))
            }

            resolve(row['max(history.timestamp)'])
        })
    },
    lastOff: () => {
        return new Promise((resolve, reject) => {
            const db = new sqlite(config.database.name)

            const row = db.prepare('select max(history.timestamp) from sensors join history on sensors.id = history.id where sensors.type = "infrared" and history.value != 1').get()

            db.close()

            if (!row) {
                reject(new Error('Infrared sensor doesn\'t exist'))
            }

            resolve(row['max(history.timestamp)'])
        })
    }
}
