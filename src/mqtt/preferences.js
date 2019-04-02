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

const cron = require('node-cron')

const database = require('../database')

module.exports = (client) => {
    cron.schedule('* * * * *', async () => {
        const preferences = await database.sensors.preferences()

        preferences.light.map(light => {
            client.publish(`302CEM/bear/preferences/sensor_light/sensor_${light.id}/threshold`, `${light.threshold}`)
        })

        preferences.temperature.map(temperature => {
            client.publish(`302CEM/bear/preferences/sensor_temperature/sensor_${temperature.id}/lowerThreshold`, `${temperature.lowerThreshold}`)
            client.publish(`302CEM/bear/preferences/sensor_temperature/sensor_${temperature.id}/higherThreshold`, `${temperature.higherThreshold}`)
        })

        preferences.infrared.map(infrared => {
            client.publish(`302CEM/bear/preferences/sensor_infrared/sensor_${infrared.id}/lowerThreshold`, `${infrared.timeout}`)
        })
    })
}
