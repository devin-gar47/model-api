import prismaClient from '@prisma/client';
import express from 'express'
import authRouter from './src/routes/auth-routes.js'
import tableRouter from './src/routes/table-routes.js'
import draftKingsRouter from './src/routes/draft-kings-routes.js'
import cors from 'cors'

const app = express();
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()
const port = process.env.PORT || 3030;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://alex-model-project.herokuapp.com'],
  optionsSuccessStatus: 200,
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

async function main() {
  const test = await prisma.sportstable.create(
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
    const results = await prisma.sportstable.findMany()
    res.send(results)
  }
  catch(e){
    res.status(500).send({error: e})
  }
})

app.use('/user', authRouter)
app.use('/table', tableRouter)
app.use('/draft-kings', draftKingsRouter)

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});