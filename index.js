const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let votationPool = [];
/*
    votationPool: [
        { 
            id: String
            options: [
                { value: String, users: Int }
                ...
            ]
        }
    ]
 */

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 5000;
server.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/vote/:id', (req, res) => {
    if (req.params.id) {

    }

    res.sendFile(__dirname + '/public/vote.html');
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('create pool', (id) => {
        const newPool = {
            id,
            options: [
                {
                    name: "YES",
                    users: 0
                },
                {
                    name: "NO",
                    users: 0
                },
            ]
        };

        votationPool.push(newPool);
        console.log(votationPool);

    });

    socket.on('vote pool', (pool, index) => {
        votationPool.find(element => element.id == pool).options[index].users++;
        votationPool.map(e => {
            console.log(e.options[index].users);
        });
    });

    socket.on('check pool', (pool) => {
        let poolChecker = false;

        console.log(pool);
        
        for (const index in votationPool) {
            const element = votationPool[index];
            console.log(element.id);
            
            
            if (element.id == pool) {
                console.log('HRYUF WTGERGFWUHYERFUIOHE');
                
                poolChecker = true;
                break;
            }
        }

        socket.emit('check result', poolChecker, poolChecker ? pool : '');
    })
});