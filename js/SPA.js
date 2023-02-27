'use strict';

window.onhashchange = SwitchToStateFromURLHash; // ф-ция, которая будет рендерить; подписываемся на onhashchange (на изменение #), на обновление # вызываем функцию SwitchToStateFromURLHash
let SPAStateH = {}; // это описание странички {pagename : About}; этот хэш сохраняется в URL
let canv = document.getElementById('canvas1');
let mainPage = document.getElementById('mainPage');

function SwitchToStateFromURLHash() { // когда мы среагировали на изменение хэша, мы забираем этот хэш, забираем информацию после # c #
  let URLHash = window.location.hash;
  let StateJSON = decodeURIComponent(URLHash.substr(1)); // убираем # и делаем decode
  if (StateJSON !== "")
    SPAStateH = JSON.parse(StateJSON); // если непустая - разбираем JSON, превращаем строку в объект
  else
    SPAStateH = {pagename: 'main'}; // если StateJSON нету - загружаем главную

  let PageHTML = "";
  switch (SPAStateH.pagename) { // когда поняли, какая страница нужна - формируем нужный html
    case 'main':
    function renderMainPage() {
      PageHTML += '<p>FISH KILLS FISH</p>'
      PageHTML += '<div class="main-menu-wrapper" id="app">' +
        '<div class="main-menu-container">' +
        '<button type="button" id="startButton" onclick="switchToGameField()"><span>START</span></button>' +
        '<button type="button" id="rulesButton" onclick="switchToPageRules()"><span>RULES</span></button>' +
        '<button type="button" id="aboutUsButton" onclick="switchToPageAboutUs()"><span>ABOUT US</span></button></div></div>';
    }
      renderMainPage();
      break;

    case 'game':
      PageHTML += '<button type="button" id="start" onclick="startGameField()"><span>START</span></button>'
      break;

    case 'rules':
      PageHTML += '<h3>Правила:</h3>';
      PageHTML += '<div>Погрузись в фантастический мир подводного царства планеты "Бенгор".<br>' +
        'Отважный морской конек "Искорка" плывет навстречу злобным морским хищникам.<br>' +
        'Управление героем - клавишами &#8593; &#8595;, стрелять - клавиша "пробел".<br>' +
        'Самая коварная - рыба-дрон. Она всегда больше, чем одна. Попробуй уничтожить ее - и тебя ждет не самый приятный сюрприз.<br>' +
        'А сталкновение со светящейся рыбой-счастливчиком активирует супер-способности героя. ' +
        'Ты начнешь стрельбу сразу из двух оружий и получишь бесконечный запас боеприпасов.<br>' +
        'Торопись! За 30 секунд тебе нужно набрать 80 очков, чтобы победить.<br>Вперед, отважный герой!</div>';
      break;

    case 'aboutUs':
      PageHTML += '<h3>О нас:</h3>';
      PageHTML += '<div>Выпускной проект курса “Разработка веб-приложений на JavaScript”. <br>Автор: Партыка Елена.' +
        '<br>Гродно, 2023 г.<br></div>';
      break;
  }

  mainPage.innerHTML = PageHTML; // innerHTML нужному блоку
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMain() {
  SwitchToState({pagename: 'main'});
}

function switchToGameField() {
  SwitchToState({pagename: 'game'});
  startGame();
}

function switchToPageRules() {
  SwitchToState({pagename: 'rules'});
}

function switchToPageAboutUs() {
  SwitchToState({pagename: 'aboutUs'});
}

function startGameField() {
  startGame();
}

function startGame() {
  mainPage.classList.add('hide');
  canv.classList.remove('hide');
  lounchGame();
}

function initPage() {
  function createImage() {
    const attributes = [
      {id: 'player', src: 'img/player.png', alt: 'player'},
      {id: 'angler1', src: 'img/angler1.png', alt: 'angler1'},
      {id: 'angler2', src: 'img/angler2.png', alt: 'angler2'},
      {id: 'lucky', src: 'img/lucky.png', alt: 'fish lucky'},
      {id: 'hivewhale', src: 'img/hivewhale.png', alt: 'hivewhale'},
      {id: 'drone', src: 'img/drone.png', alt: 'drone'},
      {id: 'projectile', src: 'img/projectile.png', alt: 'projectile'},
      {id: 'gears', src: 'img/gears.png', alt: 'gears'},
      {id: 'smokeExplosion', src: 'img/smokeExplosion.png', alt: 'smokeExplosion'},
      {id: 'fireExplosion', src: 'img/fireExplosion.png', alt: 'fireExplosion'},
      {id: 'layer1', src: 'img/layer1.png', alt: 'layer1'},
      {id: 'layer2', src: 'img/layer2.png', alt: 'layer2'},
      {id: 'layer3', src: 'img/layer3.png', alt: 'layer3'},
      {id: 'layer4', src: 'img/layer4.png', alt: 'layer4'},
    ]

    attributes.map(function({ id, src, alt }) {
      const img = document.createElement('img');
      img.id = id;
      img.src = src;
      img.alt = alt;
      document.body.appendChild(img);
    });
  }

  createImage();

  SwitchToStateFromURLHash(); // первая отрисовка
}

initPage();

window.onbeforeunload = function() {
  return 'You have unsaved changes!';
}

