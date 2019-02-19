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

const mqtt = require('mqtt')

const database = require('../database')

const config = require('../config')

const client = mqtt.connect(config.mqtt)

client.on('connect', () => {
    client.subscribe('302CEM/bear/#', (err) => {
        if (err) {
            console.log(err)
        }
    })
})

client.on('message', (topic, message) => {
    const sensor = {
        id: parseInt(topic.match(/(?<=sensor_)(\d+)/).pop()),
        type: topic.match(/(?<=sensor_)(.+?(?=\/))/).pop()
    }

    try {
        database.sensors.findById(sensor.id)
    } catch (err) {
        database.sensors.add(sensor)
    }

    database.sensors.history.log(sensor.id, message.toString())
})