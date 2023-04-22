import prismaClient from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils.js'
import express from 'express'
import bcrypt from 'bcryptjs'

const { PrismaClient } = prismaClient
const authRouter = express()
const prisma = new PrismaClient()

authRouter.post('/reset', async (req, res) => {
    try {
        await prisma.model_user.deleteMany({})
        res.send('complete')
    } catch (e) {
        res.status(500).send(e)
    }
})

authRouter.post('/sign-up', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await prisma.model_user.create({
            data: {
                role: req.body.role,
                username: req.body.username,
                password: hashedPassword,
            },
        })
        console.log('added user')
        res.status(200).send({
            role: req.body.role,
            username: req.body.username,
        })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

authRouter.post('/login', async (req, res) => {
    const user = await prisma.model_user.findUnique({
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
