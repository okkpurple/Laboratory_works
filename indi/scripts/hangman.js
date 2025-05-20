/* scripts/hangman.js */
import { showMenu } from './main.js';

/* ────────── word pools ────────── */
const categories = {
    Технологии: [
        "компьютер","программа","интернет","клавиатура","монитор",
        "браузер","алгоритм","сервер","данные","виртуализация",
        "робот","искусственныйинтеллект","блокчейн","облачныевычисления"
    ],
    Животные: [
        "тигр","кенгуру","дельфин","еж","совка","орёл","хамелеон","носорог",
        "бегемот","жираф","лисица","панда","страус","белка","айболит"
    ],
    Фрукты: [
        "яблоко","груша","банан","апельсин","персик","слива","гранат","манго",
        "киви","абрикос","арбуз","кумкват","грейпфрут"
    ],
    Города: [
        "москва","петербург","новосибирск","екатеринбург","нижнийновгород",
        "казань","самара","омск","челябинск","ростов","владивосток",
        "калининград","минск","киев","алматы"
    ],
    Спорт: [
        "футбол","баскетбол","теннис","хоккей","биатлон","плавание","регби",
        "волейбол","дзюдо","серфинг","шахматы","скейтбординг","пауэрлифтинг"
    ],
    Профессии: [
        "врач","инженер","учитель","архитектор","программист","дизайнер",
        "полицейский","шафёр","пекарь","юрист","журналист","фармацевт","биолог"
    ],
    Музыка: [
        "гитара","скрипка","фортепиано","труба","барабаны","саксофон","арфа",
        "виолончель","балалайка","аккордеон","синтезатор","мандолина"
    ],
    Цветы: [
        "роза","тюльпан","ромашка","орхидея","ирис","лилия","пион","георгин",
        "гортензия","подсолнух","флокс","лаванда","нарцисс"
    ]
};

const letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split('');


/* ────────── mutable game state ────────── */
let maxWrongGuesses = 6;         // overwritten per game
let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let gameEnded = false;
let categoryName = '';

/* ────────── stats helpers ────────── */
function loadStats() {
    return JSON.parse(localStorage.getItem('hangmanStats')
        || '{"wins":0,"losses":0,"current":0,"best":0}');
}
function saveStats(s) {
    localStorage.setItem('hangmanStats', JSON.stringify(s));
}

/* ────────── game entry ────────── */
export function startHangman(lives = 6) {
    maxWrongGuesses = lives;          // EASY 8, NORMAL 6, HARD 4

    const cats = Object.keys(categories);
    categoryName = cats[Math.floor(Math.random()*cats.length)];
    const list = categories[categoryName];
    selectedWord = list[Math.floor(Math.random()*list.length)];

    guessedLetters = [];
    wrongGuesses   = 0;
    gameEnded      = false;

    renderGame();
}

/* ────────── rendering ────────── */
function renderGame() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h1>Виселица</h1>
    <p style="font-style:italic;">Категория: ${categoryName}</p>
    <canvas id="hangmanCanvas" width="200" height="250"></canvas>
    <div id="word">${maskedWord()}</div>
    <p>Осталось попыток: <span id="attemptsLeft">${maxWrongGuesses - wrongGuesses}</span></p>

    <div id="keyboard" style="display:grid;grid-template-columns:repeat(11,1fr);gap:4px;margin:10px 0;"></div>

    <button id="hintBtn" ${gameEnded?'disabled':''}>Подсказка (-1 жизнь)</button>
    <p id="message"></p>
    <div id="statsBox"></div>
    <button id="backBtn">Назад</button>
  `;

    renderKeyboard();
    drawHangman();

    document.getElementById('backBtn').addEventListener('click', showMenu);
    document.getElementById('hintBtn').addEventListener('click', useHint);
}

/* ────────── keyboard ────────── */
function renderKeyboard() {
    const kb=document.getElementById('keyboard');
    kb.innerHTML='';
    letters.forEach(l=>{
        const b=document.createElement('button');
        b.textContent=l; b.style.padding='6px';
        b.disabled=guessedLetters.includes(l)||gameEnded;
        b.addEventListener('click',()=>guess(l));
        kb.appendChild(b);
    });
}

/* ────────── game logic ────────── */
function maskedWord() {
    return selectedWord.split('').map(ch => {
        const reveal = guessedLetters.includes(ch);
        return `<span class="${reveal?'':'empty'}">${reveal?ch:'_'}</span>`;
    }).join('');
}

function guess(l) {
    if (gameEnded || guessedLetters.includes(l)) return;
    guessedLetters.push(l);
    if (!selectedWord.includes(l)) wrongGuesses++;
    checkStatus(); renderGame();
}

function useHint() {
    if (gameEnded || wrongGuesses >= maxWrongGuesses - 1) return;
    const remaining = selectedWord.split('').filter(ch => !guessedLetters.includes(ch));
    if (remaining.length) {
        guessedLetters.push(remaining[Math.floor(Math.random()*remaining.length)]);
        wrongGuesses++; checkStatus(); renderGame();
    }
}

/* ────────── status & stats ────────── */
function checkStatus() {
    const msg = document.getElementById('message') || { textContent: '' };
    const stats = loadStats();

    if (wrongGuesses >= maxWrongGuesses) {
        msg.textContent = `Вы проиграли! Было слово: ${selectedWord}`;
        gameEnded = true;
        stats.losses++; stats.current = 0;
    } else if (selectedWord.split('').every(ch => guessedLetters.includes(ch))) {
        msg.textContent = `Поздравляем! Вы угадали: ${selectedWord}`;
        confetti({ particleCount: 120, spread: 60, origin: { y: 0.6 } });
        gameEnded = true;
        stats.wins++; stats.current++;
        if (stats.current > stats.best) stats.best = stats.current;
    }

    if (gameEnded) {
        saveStats(stats);
        showStatsInline(stats);
    }
}

function showStatsInline(s) {
    const box = document.getElementById('statsBox');
    box.innerHTML = `
    <p><strong>Ваши результаты</strong><br>
    Побед: ${s.wins}  |  Поражений: ${s.losses}<br>
    Текущая серия: ${s.current}  |  Лучшая серия: ${s.best}</p>
  `;
}

/* ────────── drawing ────────── */
function drawHangman() {
    const ctx = document.getElementById('hangmanCanvas').getContext('2d');
    ctx.clearRect(0, 0, 200, 250);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    ctx.beginPath(); ctx.moveTo(10, 230); ctx.lineTo(190, 230); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, 230); ctx.lineTo(50, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, 20); ctx.lineTo(130, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(130, 20); ctx.lineTo(130, 50); ctx.stroke();

    if (wrongGuesses > 0) { ctx.beginPath(); ctx.arc(130, 70, 20, 0, Math.PI*2); ctx.stroke(); }
    if (wrongGuesses > 1) { ctx.beginPath(); ctx.moveTo(130, 90);  ctx.lineTo(130, 150); ctx.stroke(); }
    if (wrongGuesses > 2) { ctx.beginPath(); ctx.moveTo(130, 110); ctx.lineTo(100, 130); ctx.stroke(); }
    if (wrongGuesses > 3) { ctx.beginPath(); ctx.moveTo(130, 110); ctx.lineTo(160, 130); ctx.stroke(); }
    if (wrongGuesses > 4) { ctx.beginPath(); ctx.moveTo(130, 150); ctx.lineTo(100, 190); ctx.stroke(); }
    if (wrongGuesses > 5) { ctx.beginPath(); ctx.moveTo(130, 150); ctx.lineTo(160, 190); ctx.stroke(); }

    const left = document.getElementById('attemptsLeft');
    if (left) left.textContent = maxWrongGuesses - wrongGuesses;
}
