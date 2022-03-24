import prismaClient from '@prisma/client'
import { generateAccessToken } from '../utils/jwt-utils.js'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'

const { PrismaClient } = prismaClient
const draftKingsRouter = express()
const prisma = new PrismaClient()

let toggle = true

var whitelist = ['http://localhost:3000/', 'https://alex-model-project.herokuapp.com']

const corsOptions = {
    origin: (origin, callback) => {
        whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
    },
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
    toggle = true
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
                      division_game: 'YES',
                      line: '1.5',
                      over_odds: '+100',
                      under_odds: '-125',
                  },
                  {
                      game: 'CWS/DET',
                      road_ml: '-245',
                      home_ml: '175',
                      pick: 'DOG',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'NO',
                      line: '1.5',
                      over_odds: '+100',
                      under_odds: '-125',
                  },
                  {
                      game: 'DET/CWS',
                      road_ml: '175',
                      home_ml: '-245',
                      pick: 'FAV',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'YES',
                      line: '2.5',
                      over_odds: '-135',
                      under_odds: '+115',
                  },
                  {
                      game: 'DET/CWS',
                      road_ml: '175',
                      home_ml: '-245',
                      pick: 'FAV',
                      ou: '9.5',
                      g1: 'NO',
                      division_game: 'NO',
                      line: '2.5',
                      over_odds: '-135',
                      under_odds: '+115',
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
                      division_game: 'YES',
                      line: '1.5',
                      over_odds: '-105',
                      under_odds: '-130',
                  },
                  {
                      game: 'CWS/DET',
                      road_ml: '-245',
                      home_ml: '175',
                      pick: 'DOG',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'NO',
                      line: '1.5',
                      over_odds: '+105',
                      under_odds: '-125',
                  },
                  {
                      game: 'DET/CWS',
                      road_ml: '175',
                      home_ml: '-245',
                      pick: 'FAV',
                      ou: '9',
                      g1: 'YES',
                      division_game: 'YES',
                      line: '2.5',
                      over_odds: '-115',
                      under_odds: '+125',
                  },
                  {
                      game: 'DET/CWS',
                      road_ml: '175',
                      home_ml: '-245',
                      pick: 'FAV',
                      ou: '9',
                      g1: 'NO',
                      division_game: 'NO',
                      line: '2.5',
                      over_odds: '-125',
                      under_odds: '+105',
                  },
              ]
    )
})

export default draftKingsRouter
