function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generateRandom(min, max, cant=10) {
    let numbers = {};
    for (let i = 0; i < cant; i++) {
        let num = randomIntFromInterval(min, max);
        if (numbers.hasOwnProperty(num)) {
            numbers[num].name = num; 
            numbers[num].cant++; 
        } else {
            numbers[num] = {
                name: num,
                cant: 1
            }; 
        }
    }
    return numbers;
}

process.on('message', (msg) => {
    let numbers;
    if (process.argv[2] === 'undefined') {
        numbers = generateRandom(1, 1000, 100000000);
    } else {
        // 500000000
        numbers = generateRandom(1, 1000, process.argv[2]);
    }
    process.send(numbers);
});



