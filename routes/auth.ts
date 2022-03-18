import { PrismaClient } from '@prisma/client'
import express from 'express'
const app = express()
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

app.post('/signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      await prisma.user.create({
        data: {
          role: req.body.role,
          username: req.body.username,
          password: hashedPassword
        }
      })
      res.status(200).send(await prisma.user.findMany())
    }
    catch(e){
      res.status(500).send(e)
    }
})

app.post('/login', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if(!user) return res.status(400).send('Cannot find user!')

    try {
        await bcrypt.compare(req.body.password, user.password) ? res.status(200).send('Success!') : res.status(400).send('Password is incorrect!')
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = app