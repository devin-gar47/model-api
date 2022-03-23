import prismaClient from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils.js'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'

const { PrismaClient } = prismaClient
const draftKingsRouter = express()
const prisma = new PrismaClient()

let toggle = true

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
draftKingsRouter.use(cors(corsOptions))

draftKingsRouter.post('/reset', async (req, res) => {
    try {
        await prisma.user.deleteMany({})
        res.send('complete')
    } catch (e) {
        res.status(500).send(e)
    }
})

draftKingsRouter.get('/test-get-data', async (req, res) => {
    toggle = !toggle
    res.status(200).send(
        toggle
            ? [
                  {
                      game: 'CWS/DET',
                      road_ml: '-245',
                      home_ml: '175',
                      pick: 'DOG',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'NO',
                      line: '1.5',
                      over_odds: '-100',
                      // implied_over_probability: '',
                      under_odds: '-125',
                      // implied_under_probability: '',
                      // true_over_probability: '58.17%',
                      // true_under_probability: '41.83%',
                      // suggestion: '8.17% Over',
                  },
              ]
            : [
                  {
                      game: 'CWS/DET',
                      road_ml: '-245',
                      home_ml: '175',
                      pick: 'DOG',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'NO',
                      line: '1.5',
                      over_odds: '-105',
                      // implied_over_probability: '',
                      under_odds: '-125',
                      // implied_under_probability: '',
                      // true_over_probability: '58.17%',
                      // true_under_probability: '41.83%',
                      // suggestion: '8.17% Over',
                  },
              ]
    )
})

export default draftKingsRouter
