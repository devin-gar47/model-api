import prismaClient from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils.js'
import express from 'express'
import bcrypt from 'bcrypt'

const { PrismaClient } = prismaClient
const authRouter = express()
const prisma = new PrismaClient()

authRouter.post('/signup', async (req, res) => {
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
            res.json({ accessToken })
        } else {
            res.status(403).send('Invalid password')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

export default authRouter
