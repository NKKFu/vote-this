import { Request, Response } from 'express';
import * as path from 'path';

const express = require('express');
const router = express.Router();

import votationPool, { Choice, Pool } from './Controllers/PoolController';

router.get('/', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/vote/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    if (id) {
        const isValid = votationPool.filter(pool => pool.id === Number(id));

        if (isValid)
            response.sendFile(path.join(__dirname, '..', 'public', 'vote.html'));
        else
            response.sendFile(path.join(__dirname, '..', 'public', '404.html'));

    } else {
        response.sendFile(path.join(__dirname, '..', 'public', '404.html'));
    }
});

export default router;