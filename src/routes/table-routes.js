import prismaClient from '@prisma/client'
import express from 'express'
import { resetTable } from '../utils/table-utils.js'
import cors from 'cors'

const tableRouter = express()
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
tableRouter.use(cors(corsOptions))

async function updateRow(infoObj) {
    const { ou, year, sport, home, division, newCellInfo } = infoObj
    const { columnID, record } = newCellInfo
    console.log(infoObj)
    await prisma.testtable2.update({
        where: {
            ou_year_sport_home_division: {
                ou,
                year,
                sport,
                home,
                division,
            },
        },
        data: {
            [columnID]: record,
        },
    })
}

tableRouter.put('/update-row', async (req, res) => {
    const infoObj = req.body
    try {
        await updateRow(infoObj)
        const results = await prisma.testtable2.findMany()
        res.send(results)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

tableRouter.post('/reset', async (req, res) => {
    try {
        await prisma.testtable2.deleteMany({})
        const baseballHomeNonDiv2017Data = resetTable('BASEBALL', 2017, true, false)
        const baseballHomeDiv2017Data = resetTable('BASEBALL', 2017, true, true)
        const baseballHomeNonDiv2022Data = resetTable('BASEBALL', 2022, true, false)
        const baseballHomeDiv2022Data = resetTable('BASEBALL', 2022, true, true)
        const finalArr = [
            ...baseballHomeNonDiv2017Data,
            ...baseballHomeDiv2017Data,
            ...baseballHomeNonDiv2022Data,
            ...baseballHomeDiv2022Data,
        ]
        await prisma.testtable2.createMany({
            data: finalArr,
        })
        res.send('complete')
    } catch (e) {
        res.status(500).send(e)
    }
})

tableRouter.post('/get-table-data', async (req, res) => {
    try {
        const { year, sport, home, division } = req.body
        const tableInfo = await prisma.testtable2.findMany({
            where: {
                year,
                sport,
                home,
                division,
            },
            select: {
                ou: true,
                year: true,
                sport: true,
                home: true,
                division: true,
                g1_fav_o2point5: true,
                g1_fav_o1point5OR3point5: true,
                g1_dog_o2point5: true,
                g1_dog_o1point5OR3point5: true,
                fav_o2point5: true,
                fav_o1point5OR3point5: true,
                dog_o2point5: true,
                dog_o1point5OR3point5: true,
                home_mlo2point5: true,
                home_mlo3point5: true,
                ifRoadMLOnePointFive: true,
            },
        })
        tableInfo.sort((a, b) => {
            return parseFloat(a.ou) < parseFloat(b.ou) ? -1 : 1
        })
        res.status(200).send(tableInfo)
    } catch (e) {
        res.status(500).send(e)
    }
})

export default tableRouter
