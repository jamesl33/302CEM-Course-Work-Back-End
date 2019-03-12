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
 * @name threshold/min
 * @description Get the lower threshold for a temperature sensor
 * @route {GET} /threshold/min
 * @queryparam {Integer} - The id of a temperature sensor in the database
 */
router.get('/threshold/min', (req, res) => {
    if (req.query.id === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    let threshold = undefined

    try {
        threshold = database.sensors.temperature.getLowerThreshold(req.query.id)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.send({
        threshold: threshold
    })
})

/**
 * @name threshold/max
 * @description Get the higher threshold for a temperature sensor
 * @route {GET} /threshold/max
 * @queryparam {Integer} - The id of a temperature sensor in the database
 */
router.get('/threshold/max', (req, res) => {
    if (req.query.id === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    let threshold = undefined

    try {
        threshold = database.sensors.temperature.getHigherThreshold(req.query.id)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.send({
        threshold: threshold
    })
})

/**
 * @name thresholds
 * @description Get the activation threshold for a temperature sensor
 * @route {GET} /thresholds
 * @queryparam {Integer} - The id of a temperature sensor in the database
 */
router.get('/thresholds', (req, res) => {
    if (req.query.id === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    let thresholds = undefined

    try {
        thresholds = database.sensors.temperature.getThreshold(req.query.id)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.send(thresholds)
})

/**
 * @name threshold/min
 * @description Set the lower threshold for a temperature sensor
 * @route {POST} /threshold/min
 * @bodyparam {Integer} - The id of the temperature sensor in the database
 * @bodyparam {Float} - The new lower threshold
 */
router.post('/threshold/min', (req, res) => {
    if (req.body.id === undefined || req.body.threshold === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    try {
        database.sensors.temperature.setLowerThreshold(req.body.id, req.body.threshold)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.sendStatus(204)
})

/**
 * @name threshold/max
 * @description Set the higher threshold for a temperature sensor
 * @route {POST} /threshold/max
 * @bodyparam {Integer} - The id of the temperature sensor in the database
 * @bodyparam {Float} - The new higher threshold
 */
router.post('/threshold/max', (req, res) => {
    if (req.body.id === undefined || req.body.threshold === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    try {
        database.sensors.temperature.setHigherThreshold(req.body.id, req.body.threshold)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.sendStatus(204)
})

/**
 * @name thresholds
 * @description Set the activation threshold for a temperature sensor
 * @route {POST} /thresholds
 * @bodyparam {Integer} id - The id of the temperature, whose threshold we are setting
 * @bodyparam {Integer} lowerThrehold - The value to be set as the new lowerThrehold
 * @bodyparam {Integer} higherThrehold - The value to be set as the new higherThreshold
 */
router.post('/thresholds', (req, res) => {
    if (req.body.id === undefined || req.body.lowerThrehold === undefined || req.body.higherThreshold === undefined) {
        // The user didn't send enough data in the query params
        return res.sendStatus(422)
    }

    try {
        database.sensors.temperature.setThreshold(req.body.id, req.body.lowerThrehold, req.body.higherThreshold)
    } catch (err) {
        // The requested light sensor was not found
        return res.sendStatus(422)
    }

    return res.sendStatus(204)
})

module.exports = router
