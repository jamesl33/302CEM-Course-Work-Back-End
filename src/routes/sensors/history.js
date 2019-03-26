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

/**
 * @name byId
 * @description Get a set of historical sensor data for a specific sensor.
 * @route {GET} /byId
 * @param {Integer} id - The id of a sensor in the database.
 * @param {Integer} min - The lowest time to be collected from the database.
 * @param {Integer} max - The largest time to be collected from the database.
 */
router.get('/byId', async (req, res) => {
    if (req.query.id === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    let min = req.query.min
    let max = req.query.max

    if (min === undefined) {
        min = 0
    }

    if (max === undefined) {
        max = (new Date).getTime()
    }

    try {
        res.send(await database.sensors.history.byId(req.query.id, min, max))
    } catch (err) {
        // The requested sensor was not found
        return res.sendStatus(422)
    }
})

/**
 * @name byType
 * @description
 * @route {GET} /byType
 * @param {String} type - A type of sensor stored in the database.
 * @param {Integer} min - The lowest time to be collected from the database.
 * @param {Integer} max - The largest time to be collected from the database.
 */
router.get('/byType', async (req, res) => {
    if (req.query.type === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    let min = req.query.min
    let max = req.query.max

    if (min === undefined) {
        min = 0
    }

    if (max === undefined) {
        max = (new Date).getTime()
    }

    try {
        res.send(await database.sensors.history.byType(req.query.type, min, max))
    } catch (err) {
        // The requested sensor was not found
        return res.sendStatus(422)
    }
})

module.exports = router
