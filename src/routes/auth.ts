import { PrismaClient } from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils'
import express from 'express'

const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const prisma = new PrismaClient()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await prisma.user.create({
            data: {
                role: req.body.role,
                username: req.body.username,
                password: hashedPassword,
            },
        })
        res.status(200).send('User created successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/login', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })

    if (!user) return res.status(400).send('Cannot find user!')

    try {
        const compare = await bcrypt.compare(req.body.password, user.password)
        if (compare) {
            const accessToken = generateAccessToken(user)
            res.json({ accessToken })
        } else {
            res.status(403).send('Invalid password')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = app
