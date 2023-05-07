import playwright from 'playwright'


enum Pick {
    Dog = "DOG",
    Favorite = "FAV",
    Unavailable = "UNAVAILABLE"
}

const getPick = (homeML: string, awayML: string) => {
    if(!homeML) return Pick.Unavailable

    let homeNumber
    let awayNumber
    const homePick = homeML?.includes('+') ? Pick.Dog : Pick.Favorite
    const awayPick = awayML?.includes('+') ? Pick.Dog : Pick.Favorite

    if(homePick === Pick.Favorite && awayPick === Pick.Favorite){
        homeNumber = parseInt(homeML.split('-')[1])
        awayNumber = parseInt(awayML.split('-')[1])

        return homeNumber > awayNumber ? Pick.Favorite : Pick.Dog
    }
    else if (homePick === Pick.Dog && awayPick === Pick.Dog) {
        homeNumber = parseInt(homeML.split('+')[1])
        awayNumber = parseInt(awayML.split('+')[1])

        return homeNumber < awayNumber ? Pick.Favorite : Pick.Dog
    }

    return homeML?.includes('+') ? Pick.Dog : Pick.Favorite
}

const constructGame = (homeTeam: string, awayTeam: string) => {
    const home = homeTeam.split(' ')[0]
    const away = awayTeam.split(' ')[0]
    return `${home}/${away}`
}

const constructLine = (homeLines, awayLines): Object => {
    const runLine = homeLines[0]?.split('\n')[0]
    const ouLine = homeLines[1]?.split('\n').filter((el) => el.trim())[1]
    const pick = homeLines[2]?.includes('+') ? Pick.Dog : Pick.Favorite

    return {
        home_ml: homeLines[2] || "",
        away_ml: awayLines[2] || "",
        ou: ouLine || "",
        runLine: runLine || "",
        pick: getPick(homeLines[2], awayLines[2])
    }
}

const scrapeTests = async () => {
    try{
        const browser = await playwright.chromium.launch({
            headless: true
        })
        const result = []
        const page = await browser.newPage();
        const teamInfoSelector = '#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > th > a > div > div.event-cell > div > span > div > div'
        const lineInfoSelector = '#root > section > section.sportsbook-wrapper__body > section > div.sportsbook-league-page__body > div > div.sportsbook-responsive-card-container__body > div > div > div.sportsbook-card-accordion__children-wrapper > div > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td'
    
        await page.goto('https://sportsbook.draftkings.com/leagues/baseball/mlb?category=game-lines&subcategory=game')
        const teams =  await page.locator(teamInfoSelector).allInnerTexts()
        const lines =  await page.locator(lineInfoSelector).allInnerTexts()

        teams.forEach((team, index, arr) => {
            if(index % 2 === 0){
                const homeTeam = team
                const awayTeam = arr[index+1]
                const homeLines = lines.splice(0,3)
                const awayLines = lines.splice(0,3)

                const res = {
                    home_team: homeTeam,
                    away_team: awayTeam,
                    game: constructGame(homeTeam, awayTeam),
                    ...constructLine(homeLines, awayLines)
                }
                result.push(res)
            }
        })
        
        console.log(result)
        await page.close()
    }
    catch(e){
        console.log(e)
    }
    finally {
        process.exit()
    }
}

scrapeTests()