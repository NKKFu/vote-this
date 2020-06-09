import { Request, Response } from 'express';
import * as path from 'path';
const express = require('express');
import routes from './routes';
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

import votationPool, { Choice, Pool } from './Controllers/PoolController';

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routes);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket: any) => {
    console.log('New user connected');

    socket.on('create pool', (id: Number) => {
        const newPool = new Object() as Pool;

        newPool.title = 'Você consegue correr?'
        newPool.id = Number(id);
        newPool.choices = [
            { label: "Yes", people: 0 },
            { label: "No", people: 0 }
        ]

        votationPool.push(newPool);
    });

    socket.on('vote pool', (pool_id: Number, index: Number) => {
        if (votationPool.length > 0) {
            const filteredPool = votationPool.find((pool: Pool) => pool.id == pool_id);

            if (filteredPool)
                filteredPool.choices[Number(index)].people++;
        }
    });
});

console.log(`Something started at ${PORT}`);

server.listen(PORT);