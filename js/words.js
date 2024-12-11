const fs = require('fs');
const path = require('path');

//path para o ficheiro de texto
const filePath = path.join(__dirname, '../assets/poem_file', 'theRaven_words.txt');

let words = [];

function loadWords() {
    try {
        const data = fs.readFileSync(filePath, 'utf8'); 
        words = data.split("+"); // dividir usando +
    } catch (err) {
        console.error("Error reading the file:", err.message);
    }
}

function* wordGenerator() {
    for (const word of words) {
        yield word;
    }
}

loadWords();
const generator = wordGenerator();

function getNextWord() {
    const next = generator.next();
    if (!next.done) {
        return next.value;
    }
}

