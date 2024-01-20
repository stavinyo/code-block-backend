console.log('Server script is running...')

import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3030

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT'],
        credentials: true,
    },
})


// Express App Config
app.use(express.json())
app.use(express.static('public'))

// CORS configuration
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    }
    app.use(cors(corsOptions))
}


// API routes
import { codeBlockRoutes } from './api/codeBlock.routes.js'
app.use('/api/codeblocks', codeBlockRoutes)

app.get('/api/test', (req, res) => {
    console.log('Inside /api/test route handler')
    res.json({ message: 'Test route working' })
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('codeBlockUpdated', (data) => {
        console.log('Received codeBlockUpdated event:', data)
        socket.broadcast.emit('codeBlockUpdated', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
})

server.listen(port, () => {
    console.log(`Server is up and listening to http://localhost:${port}/api/codeblocks`, port)
})
