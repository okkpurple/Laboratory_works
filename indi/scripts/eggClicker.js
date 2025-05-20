import { showMenu } from './main.js';

let clicks = 0;
const maxClicks = 20;

/*  New: list every dragon image you have  */
const dragonImages = [
    'assets/dragon-blue.png',
    'assets/dragon-green.png',
    'assets/dragon-red.png',
    'assets/dragon-gold.png',
    'assets/dragon-purple.png'
];

/*  Unchanged egg stages  */
const eggStages = [
    'assets/egg.png',
    'assets/crack1.png',
    'assets/crack2.png',
    'assets/crack3.png'
];

export function startEggClicker() {
    clicks = 0;
    renderEgg();
}

function renderEgg() {
    const app = document.getElementById('app');
    const stageIdx = Math.min(
        Math.floor((clicks / maxClicks) * eggStages.length),
        eggStages.length - 1
    );

    app.innerHTML = `
    <h1>Egg Clicker</h1>
    <p>${clicks} / ${maxClicks}</p>
    <img id="eggImage" src="${eggStages[stageIdx]}" alt="Яйцо">
    <br>
    <button id="backBtn">Назад в меню</button>
  `;

    document.getElementById('eggImage').classList.add('wiggle');
    document.getElementById('eggImage').addEventListener('click', clickEgg);
    document.getElementById('backBtn').addEventListener('click', showMenu);
}

function clickEgg() {
    clicks++;
    clicks >= maxClicks ? showDragon() : renderEgg();
}

/* ---------- random dragon ---------- */
let chosenDragon = '';   // remember which pic was rolled

function showDragon() {
    /* pick a random picture once per hatch */
    chosenDragon =
        dragonImages[Math.floor(Math.random() * dragonImages.length)];

    const app = document.getElementById('app');
    app.innerHTML = `
    <h1>Поздравляем!</h1>
    <img src="${chosenDragon}" alt="Дракончик">
    <p>Вы выиграли нового питомца! Дайте ему имя:</p>
    <input type="text" id="petNameInput" placeholder="Имя питомца">
    <br>
    <button id="savePetBtn">Сохранить</button>
    <button id="backBtn">Назад в меню</button>
  `;

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    document.getElementById('savePetBtn').addEventListener('click', savePetName);
    document.getElementById('backBtn').addEventListener('click', showMenu);
}

/* ---------- save with pic ---------- */
function savePetName() {
    const name = document.getElementById('petNameInput').value.trim();
    if (!name) return alert('Пожалуйста, введите имя!');

    const dragons = JSON.parse(localStorage.getItem('dragons') || '[]');
    dragons.push({ name, born: new Date().toISOString(), img: chosenDragon });
    localStorage.setItem('dragons', JSON.stringify(dragons));

    const app = document.getElementById('app');
    app.innerHTML = `
    <h1>Ваш питомец: ${name}</h1>
    <img src="${chosenDragon}" alt="Дракончик">
    <br>
    <button id="backBtn">Назад в меню</button>
  `;
    document.getElementById('backBtn').addEventListener('click', showMenu);
}



