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
 * @name threshold
 * @description Get the activation threshold for a light sensor
 * @route {GET} /threshold
 * @queryparam {Integer} - The id of a light sensor in the database
 */
router.get('/threshold', async (req, res) => {
    if (req.query.id == null) {
        return res.status(422).send({ 'error': 'Missing query parameter: id' })
    }

    try {
        return res.send({
            threshold: await database.sensors.light.getThreshold(req.query.id)
        })
    } catch (err) {
        return res.status(422).send({ 'error': err.message })
    }
})

/**
 * @name threshold
 * @description Set the activation threshold for a light sensor
 * @route {POST} /threshold
 * @bodyparam {Integer} id - The id of the light, whose threshold we are setting
 * @bodyparam {Integer} threshold - The value to be set as the new threshold
 */
router.post('/threshold', async (req, res) => {
    if (req.body.id == null) {
        console.log('now')
        return res.status(422).send({ 'error': 'Missing body parameter: id' })
    }

    if (req.body.threshold == null) {
        return res.status(422).send({ 'error': 'Missing body parameter: threshold' })
    }

    try {
        await database.sensors.light.setThreshold(req.body.id, req.body.threshold)
    } catch (err) {
        return res.status(422).send({ 'error': err.message })
    }

    return res.sendStatus(204)
})

module.exports = router
