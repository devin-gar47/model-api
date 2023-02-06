import prismaClient from '@prisma/client';
import express from 'express'
import authRouter from './src/routes/auth-routes.js'
import tableRouter from './src/routes/table-routes.js'
import draftKingsRouter from './src/routes/draft-kings-routes.js'
import cors from 'cors'
import puppeteer from 'puppeteer'


const app = express();
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()
const port = process.env.PORT || 3030;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://alex-model-project.herokuapp.com'],
  optionsSuccessStatus: 200,
  credentials: true
}

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

app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://sportsbook.draftkings.com/leagues/baseball/mlb?category=innings&subcategory=team-total-runs---1st-5-innings')
    // await page.waitForSelector('[class="event-cell__name-text"]')
    const teamNamesArr = await page.evaluate(() => Array.from(document.querySelectorAll('#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div > div > div.sportsbook-event-accordion__accordion > a.sportsbook-event-accordion__title'), element => element.textContent + " "))
    const ouArr = await page.evaluate(() => Array.from(document.querySelectorAll('#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div:nth-child(2) > div:nth-child(1) > table [class="sportsbook-outcome-cell"]'), element => element.textContent))
    const moneylineArr = await page.evaluate(() => Array.from(document.querySelectorAll('#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div:nth-child(2) > div:nth-child(1) > table [class="sportsbook-odds american no-margin default-color"]'), element => element.textContent))

    console.log(ouArr)

    const objArr = teamNamesArr.map((team, index) => {
      const newObj = {}
      if(index % 2 !== 0){
        newObj.game = `${teamNamesArr[index-1].split(' ')[0]}/${team.split(' ')[0]}`
        const homeOUInfo = ouArr[index]?.split?.(isHomefav ? '-' : '+')
        const homeOU = homeOUInfo && homeOUInfo[0] ? homeOUInfo[0].split?.(' ')[1] : null
        const homeML = moneylineArr[index] || null
        const roadML = moneylineArr[index-1] || null
        newObj.ou = homeOU ? homeOU : null
        newObj.home_ml = homeML
        newObj.road_ml = roadML
        newObj.pick = homeML.includes('-') ? 'FAV' : 'DOG'
        return newObj
      }
      else {
        return ''
      }
    }).filter((obj) => obj)

    console.log(objArr)
    console.log(teamNamesArr)
    console.log(ouArr)
    console.log(moneylineArr)
    res.status(200).send('done')
    await browser.close();
  }
  catch(e){
    console.log(e)
    res.status(500).send({error: e})
  }
})

app.get('/scrape-2', async (req, res) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://sportsbook.draftkings.com/leagues/baseball/mlb?category=innings&subcategory=team-total-runs---1st-5-innings')
    await page.waitForSelector('#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div:nth-child(2) > div:nth-child(1) > div.sportsbook-event-accordion__accordion > a.sportsbook-event-accordion__title > div')
    const teamNamesArr = await page.evaluate(() => Array.from(document.querySelectorAll('#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div > div > div.sportsbook-event-accordion__accordion > a.sportsbook-event-accordion__title'), element => element.textContent))
    console.log(teamNamesArr)
    return res.status(200).send('success')
  }
  catch(e){
    res.status(500).send(e)
  }
})

app.use('/user', authRouter)
app.use('/table', tableRouter)
app.use('/draft-kings', draftKingsRouter)

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});