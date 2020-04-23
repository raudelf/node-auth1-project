const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./endpoints/users-router.js');

const server = express();

const sessionConfig = {
    name: 'snickerdoodle',
    secret: 'shhh',
    cookie: {
        maxAge: 3600 * 1000,
        secure: false, // This should be true in production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', usersRouter)
server.use('/api', authRouter);

server.get('/api', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;