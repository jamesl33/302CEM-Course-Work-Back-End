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

const router = require('express').Router()

const database = require('../../database')

router.get('/lastOn', (req, res) => {
    const timestamp = database.sensors.infrared.lastOn()

    res.send({
        timestamp: timestamp
    })
})

router.get('/lastOff', (req, res) => {
    const timestamp = database.sensors.infrared.lastOff()

    res.send({
        timestamp: timestamp
    })
})

module.exports = router
