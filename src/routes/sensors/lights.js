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

router.get('/timeout', (req, res) => {
    if (req.query.id === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(400)
    }

    let timeout = undefined

    try {
        timeout = database.sensors.lights.getTimeout(req.query.id)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(400)
    }

    return res.send({
        timeout: timeout
    })
})

router.post('/timeout', (req, res) => {
    if (req.body.id === undefined || req.body.timeout === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(400)
    }

    try {
        database.sensors.lights.setTimeout(req.body.id, req.body.timeout)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(400)
    }

    return res.sendStatus(204)
})

module.exports = router
