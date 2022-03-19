import  express from 'express'
import { PrismaClient } from '@prisma/client'
import { DataType } from './src/types/types';

const app = express();
const authRouter = require('./src/routes/auth')
const tableRouter = require('./src/routes/table')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const prisma = new PrismaClient()
const port = process.env.PORT || 3030;

async function updateRow(newInfoObj: DataType): Promise<void> {
 await prisma.testtable2.update(
    {
      where: {
        year_sport_home_division: {
          year: 2017,
          sport: "",
          home: false,
          division: false
        }
      },
      data: {
        year: newInfoObj.year
      }
    },
  )
}

async function main() {
  const test = await prisma.testtable2.create(
    {
      data: {
        ou: '7',
        year: 2022,
        sport: "Baseball",
        home: true,
        division: false,
        g1_fav_o2point5: '0-0 / 0%',
        g1_fav_o1point5OR3point5: '0-0 / 0%',
        g1_dog_o2point5: '0-0 / 0%',
        g1_dog_o1point5OR3point5: '0-0 / 0%',
        fav_o2point5: '0-0 / 0%',
        fav_o1point5OR3point5: '0-0 / 0%',
        dog_o2point5: '0-0 / 0%',
        dog_o1point5OR3point5: '0-0 / 0%',
        home_mlo2point5: '0-0 / 0%',
        home_mlo3point5: '0-0 / 0%'
      }
    }
    )
  return test
}

app.get('/', async (req, res) => {
  res.send({message: 'It works!'})
})

app.get('/test', async (req, res) => {
  res.send({message: 'It works test!'})
})

app.get('/update', async (req, res) => {
  const infoObj = req.body
  try{
    await updateRow(infoObj)
    const results = await prisma.testtable2.findMany()
    res.send(results)
  }
  catch(e){
    res.status(500).send({error: e})
  }
})

app.use('/user', authRouter)
app.use('/table', tableRouter)

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});