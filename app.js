const pandemicStarMap = 'XX0X10010X000X010X0'
const pandemicStart = document.querySelector('#pandemic-start')
const pandemicEnd = document.querySelector('#pandemic-end')
const totalPopulation = document.querySelector('#total-population')
const infectedPopulation = document.querySelector('#infected')
const percentage = document.querySelector('#percentage')
let pandemicArr = pandemicStarMap.split('');
let rows = pandemicArr.length;

let numInfected = function (pandemicArr) {
    let total = 0
    let infected = 0
    let percentageInfected = 0
    if (rows.length === 0) return 0;

    function markNeighbour(pandemicArr, i) {
        pandemicArr[i] = '1'
        if (pandemicArr[i - 1] === '0') {
            markNeighbour(pandemicArr, i - 1)
        }
        if (pandemicArr[i + 1] === '0') {
            markNeighbour(pandemicArr, i + 1)
        }
    }

    for (let i = 0; i < rows; i++) {
        if (pandemicArr[i] === '1') {
            markNeighbour(pandemicArr, i)
        }
    }

    for (let i = 0; i < rows; i++) {
        if (pandemicArr[i] === '1' || pandemicArr[i] === '0') {
            total++
        }
        if (pandemicArr[i] === '1') {
            infected++
        }
    }
    percentageInfected = infected * 100 / total
    createMap(pandemicArr, pandemicEnd)
    totalPopulation.textContent = total
    infectedPopulation.textContent = infected
    percentage.textContent = percentageInfected + '%'

};

function createMap(pandemicArr, pandemicStatus) {
    for (let i = 0; i < rows; i++) {
        const div = document.createElement('div')
        pandemicArr[i] === '1'
            ? div.className = 'general-map infected '
            : pandemicArr[i] === '0' ? div.className = 'general-map uninfected' : div.className = 'general-map ocean'
        pandemicStatus.appendChild(div)
    }
}

createMap(pandemicArr, pandemicStart)
numInfected(pandemicArr)