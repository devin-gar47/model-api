import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

app.post('/reset', async (req, res) => {
    try {
        res.status(200).send('test')
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = app
