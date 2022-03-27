import prismaClient from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils.js'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'

const { PrismaClient } = prismaClient
const authRouter = express()
const prisma = new PrismaClient()

var whitelist = ['http://localhost:3000', 'https://alex-model-project.herokuapp.com']

const corsOptions = {
    origin: (origin, callback) => {
        whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus: 200,
}

authRouter.use(
    cors({
        origin: ['http://localhost:3000', 'https://alex-model-project.herokuapp.com'],
        optionsSuccessStatus: 200,
        credentials: true,
    })
)

authRouter.post('/reset', async (req, res) => {
    try {
        await prisma.user.deleteMany({})
        res.send('complete')
    } catch (e) {
        res.status(500).send(e)
    }
})

authRouter.post('/signup', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
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

authRouter.post('/login', async (req, res) => {
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
            res.status(200).send({ accessToken })
        } else {
            res.status(403).send('Invalid password')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

export default authRouter
