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

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const https = require('https')
const mqttClient = require('mqtt')
const socket_io = require('socket.io')

const config = require('./src/config')
const mqtt = require('./src/mqtt')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const server = https.Server(config.server.options, app)
const io = socket_io(server)

const routes = require('./src/routes')

const client = mqttClient.connect(config.mqtt)

// Initialise the mqtt tunnel
mqtt.tunnel(client, io)

// Collate the mqtt history
mqtt.collate(client)

// Initialise the mqtt preferences publisher.
mqtt.preferences(client)

// Base all routes on the api route
app.use('/api', routes)

const api = server.listen(config.server.port, () => {
    console.log('Server is listening on port ' + api.address().port)
})
