import prismaClient from '@prisma/client';
import express from 'express'

const tableRouter = express()
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

tableRouter.post('/reset', async (req, res) => {
    try {
        res.status(200).send('test')
    } catch (e) {
        res.status(500).send(e)
    }
})

export default tableRouter
