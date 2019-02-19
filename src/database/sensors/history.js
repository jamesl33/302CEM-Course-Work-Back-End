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
    addData: (id, type, data) => {
        const db = new sqlite(config.database.name)

        const sensor = db.prepare('select * from sensors where id = ?').get(id)

        if (sensor === undefined) {
            db.prepare('insert into sensors values (?, ?)').run(
                id,
                type
            )
        }

        db.prepare('insert into history values (?, ?, ?)').run(id, (new Date).getTime(), data)

        db.close()
    }
}
