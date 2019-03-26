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

const database = require('../../database')

const router = require('express').Router()

const history = require('./history')
const infrared = require('./infrared')
const light = require('./light')
const temperature = require('./temperature')

/**
 * @name preferences
 * @description Get all the user defined preferences for the sensors
 * @route {GET} /preferences
 */
router.get('/preferences', async (req, res) => {
    res.send(await database.sensors.preferences())
})

router.use('/history', history)
router.use('/infrared', infrared)
router.use('/light', light)
router.use('/temperature', temperature)

module.exports = router
