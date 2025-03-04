function getOtosLotteryNumbers() {
    const numbers = new Set();
    while (numbers.size < 5) {
        const randomNum = Math.floor(Math.random() * 90) + 1;
        numbers.add(randomNum);
    }
    return Array.from(numbers);
}

function getSortedLotteryNumbers(lotteryNumbers) {
    return lotteryNumbers.slice().sort((a, b) => a - b);
}

function getNumberOfHits(lotteryNumbers, guesses) {
    const hits = lotteryNumbers.filter(number => guesses.includes(number));
    return hits.length;
}

function getMonthlyLotteryArrayNumbers() {
    const monthlyNumbers = [];
    for (let i = 0; i < 4; i++) {
        monthlyNumbers.push(getOtosLotteryNumbers());
    }
    return monthlyNumbers;
}

function getUniqueMonthlyNumbers(monthlyNumbers) {
    const uniqueNumbers = new Set();
    monthlyNumbers.forEach(weekNumbers => {
        weekNumbers.forEach(number => {
            uniqueNumbers.add(number);
        });
    });
    return Array.from(uniqueNumbers);
}

function monthlyStatistics(monthlyNumbers) {
    const stats = {};
    monthlyNumbers.forEach(weekNumbers => {
        weekNumbers.forEach(number => {
            if (stats[number]) {
                stats[number]++;
            } else {
                stats[number] = 1;
            }
        });
    });
    return Object.entries(stats).map(([number, count]) => [parseInt(number), count]);
}


const otosLotteryNumbers = getOtosLotteryNumbers();
console.log('Ötös lottószámok:', otosLotteryNumbers);

const sortedNumbers = getSortedLotteryNumbers(otosLotteryNumbers);
console.log('Rendezett számok:', sortedNumbers);

const numberOfHits = getNumberOfHits(otosLotteryNumbers, [2,5,7,2,1,4,7,35,23]);
console.log('Találatok száma:', numberOfHits);

const monthlyNumbers = getMonthlyLotteryArrayNumbers();
console.log('Havi lottószámok:', monthlyNumbers);

const uniqueNumbers = getUniqueMonthlyNumbers(monthlyNumbers);
console.log('Egyedi kihúzott számok:', uniqueNumbers);

const statistics = monthlyStatistics(monthlyNumbers);
console.log('Havi statisztika:', statistics);
