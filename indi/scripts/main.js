import { startHangman } from './hangman.js';
import { startEggClicker } from './eggClicker.js';

const app = document.getElementById('app');

/* ────────── Welcome Screen ────────── */
export function showWelcomeScreen() {
    app.innerHTML = `
    <h1>Добро пожаловать в GameLand!</h1>
    <button id="enterBtn">Войти</button>
  `;
    document
        .getElementById('enterBtn')
        .addEventListener('click', showMenu);
}

/* ────────── Main Menu ────────── */
export function showMenu() {
    app.innerHTML = `
    <h1>Выберите игру</h1>
    <button id="hangmanBtn">Виселица</button>
    <button id="eggClickerBtn">Egg Clicker</button>
    <button id="galleryBtn">Мои драконы</button>
    <button id="statsBtn">Статистика Виселицы</button>
    <button id="backBtn">Назад</button>
  `;
    document.getElementById('hangmanBtn').addEventListener('click', showDifficultyMenu);
    document.getElementById('eggClickerBtn').addEventListener('click', startEggClicker);
    document.getElementById('galleryBtn').addEventListener('click', showGallery);
    document.getElementById('statsBtn').addEventListener('click', showHangmanStats);
    document.getElementById('backBtn').addEventListener('click', showWelcomeScreen);
}

/* simple read‑only stats screen */
function showHangmanStats() {
    const s = JSON.parse(localStorage.getItem('hangmanStats') || '{"wins":0,"losses":0,"current":0,"best":0}');
    app.innerHTML = `
    <h1>Статистика Виселицы</h1>
    <p>Побед: <strong>${s.wins}</strong></p>
    <p>Поражений: <strong>${s.losses}</strong></p>
    <p>Текущая серия: <strong>${s.current}</strong></p>
    <p>Лучшая серия: <strong>${s.best}</strong></p>
    <button id="backBtn">Назад</button>
  `;
    document.getElementById('backBtn').addEventListener('click', showMenu);
}


/* ────────── Gallery Screen ────────── */
export function showGallery() {
    let dragons = JSON.parse(localStorage.getItem('dragons') || '[]');

    const render = () => {
        app.innerHTML = `
      <h1>Мои драконы</h1>
      ${
            dragons.length
                ? '<ul id="dragonsList" style="list-style:none;padding:0;"></ul>'
                : '<p>У вас пока нет питомцев.</p>'
        }
      <div style="margin-top:15px;">
        <button id="backBtn">Назад</button>
        ${
            dragons.length
                ? '<button id="clearBtn" style="margin-left:10px;background:#e74c3c;">Очистить всё</button>'
                : ''
        }
      </div>
    `;

        /* populate list */
        if (dragons.length) {
            const list = document.getElementById('dragonsList');
            dragons.forEach((d, idx) => {
                const li = document.createElement('li');
                li.style.marginBottom = '12px';
                li.innerHTML = `
          <img src="${d.img}" alt="" style="width:60px;height:60px;border-radius:8px;vertical-align:middle;margin-right:10px;">
          <strong>${d.name}</strong>
          <span style="font-size:.8em;color:#666;">&nbsp;(${new Date(d.born).toLocaleDateString()})</span>
          <button data-idx="${idx}" class="delBtn" title="Удалить" style="margin-left:8px;background:#e74c3c;padding:4px 8px;">🗑️</button>
        `;
                list.appendChild(li);
            });
        }

        /* event hooks */
        document.getElementById('backBtn').addEventListener('click', showMenu);

        if (dragons.length) {
            /* per‑dragon delete */
            document
                .querySelectorAll('.delBtn')
                .forEach(btn =>
                    btn.addEventListener('click', e => {
                        const i = Number(e.target.dataset.idx);
                        if (confirm(`Удалить ${dragons[i].name}?`)) {
                            dragons.splice(i, 1);
                            localStorage.setItem('dragons', JSON.stringify(dragons));
                            render();                 // re‑render list
                        }
                    })
                );

            /* clear all */
            document
                .getElementById('clearBtn')
                .addEventListener('click', () => {
                    if (confirm('Удалить всех драконов?')) {
                        localStorage.removeItem('dragons');
                        dragons = [];
                        render();
                    }
                });
        }
    };

    render(); // initial draw
}

/* ────────── Hangman difficulty submenu ────────── */
function showDifficultyMenu() {
    app.innerHTML = `
    <h1>Сложность Виселицы</h1>
    <button id="easyBtn">Лёгко (8 жизней)</button>
    <button id="normalBtn">Нормально (6 жизней)</button>
    <button id="hardBtn">Сложно (4 жизни)</button>
    <button id="backBtn">Назад</button>
  `;

    document.getElementById('easyBtn').addEventListener('click', () => startHangman(8));
    document.getElementById('normalBtn').addEventListener('click', () => startHangman(6));
    document.getElementById('hardBtn').addEventListener('click', () => startHangman(4));
    document.getElementById('backBtn').addEventListener('click', showMenu);
}


/* ────────── Launch ────────── */
showWelcomeScreen();

