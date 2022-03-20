function resetTable(sport, year, home, division) {
    const data = []

    const initialDataArr = ['6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5-12.5']
    const newDataArr = initialDataArr.map((ou) => {
        let g1_fav_o1point5OR3point5 = '0-0 / 0% on o1.5'
        let g1_dog_o2point5 = ''
        let g1_dog_o1point5OR3point5 = '0-0 / 0% on o1.5'
        let fav_o1point5OR3point5 = '0-0 / 0% on o1.5'
        let dog_o2point5 = ''
        let dog_o1point5OR3point5 = '0-0 / 0% on o1.5'
        let home_mlo3point5 = ''
        let ifRoadMLOnePointFive = ''

        switch (ou) {
            case '7':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                break
            case '7.5':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_dog_o2point5 = '0-0 / 0%'
                dog_o2point5 = '0-0 / 0% on o2.5'
                break
            case '8':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_dog_o2point5 = '0-0 / 0%'
                dog_o2point5 = '0-0 / 0% on o2.5'
                break
            case '8.5':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_dog_o2point5 = '0-0 / 0%'
                dog_o2point5 = '0-0 / 0% on o2.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '9':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '9.5':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '10':
                ifRoadMLOnePointFive = '0-0 / 0% on o1.5'
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '10.5':
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                g1_dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '11':
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                g1_dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            case '11.5-12.5':
                g1_fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                g1_dog_o2point5 = '0-0 / 0%'
                g1_dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                fav_o1point5OR3point5 = '0-0 / 0% on o3.5'
                dog_o2point5 = '0-0 / 0% on o2.5'
                dog_o1point5OR3point5 = '0-0 / 0% on o3.5'
                home_mlo3point5 = '0-0 / 0% on o3.5'
                break
            default:
                break
        }

        return {
            ou,
            sport,
            year,
            home,
            division,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5,
            g1_dog_o2point5,
            g1_dog_o1point5OR3point5,
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5,
            dog_o2point5,
            dog_o1point5OR3point5,
            home_mlo2point5: '0-0 / 0%',
            home_mlo3point5,
            ifRoadMLOnePointFive,
        }
    })
    return newDataArr
}

function initialTableData() {
    return (
        {
            ou: '6.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '',
        },
        {
            ou: '7',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '7.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '8',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '8.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '9',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '9.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '10',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '10.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '11',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        },
        {
            ou: '11.5-12.5',
            year: 0,
            sport: '',
            home: false,
            division: false,
            g1_fav_o2point5: '0-0 / 0%',
            g1_fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            g1_dog_o2point5: '0-0 / 0%',
            g1_dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            fav_o2point5: '0-0 / 0%',
            fav_o1point5OR3point5: '0-0 / 0% on o1.5',
            dog_o2point5: '0-0 / 0% on o2.5',
            dog_o1point5OR3point5: '0-0 / 0% on o1.5',
            home_mlo2point5: '0-0 / 0% on o2.5',
            home_mlo3point5: '',
            ifRoadMLOnePointFive: '0-0 / 0% on o1.5',
        }
    )
}

export { resetTable, initialTableData }
