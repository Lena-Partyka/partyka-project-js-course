window.onhashchange = SwitchToStateFromURLHash; // подписываемся на onhashchange (на изменение #), на обновление # вызываем функцию SwitchToStateFromURLHash
var SPAStateH = {}; // это описание странички {pagename : About}; этот хэш сохраняется в URL
let canv = document.getElementById('canvas1');
let mainPage = document.getElementById('mainPage')

function SwitchToStateFromURLHash() { // когда мы среагировали на изменение хэша, мы забираем этот хэш,
  // мы забираем информацию после # c #
  var URLHash = window.location.hash;
  var StateJSON = decodeURIComponent(URLHash.substr(1)); // убираем # и делаем decode
  if (StateJSON !== "")
    SPAStateH = JSON.parse(StateJSON); // если непустая - разбираем JSON, превращаем строку в объект
  else
    SPAStateH = {pagename: 'main'}; // если StateJSON нету - загружаем главную
  console.log('Новое состояние приложения:');
  console.log(SPAStateH);

  var PageHTML = "";
  switch (SPAStateH.pagename) { // когда поняли, какая страница нужна - формируем нужный html
    case 'main':

    function renderMainPage() {
      PageHTML += '<p>FISH KILLS FISH</p>'
      PageHTML += '<div class="main-menu-wrapper" id="app">' +
        '<div class="main-menu-container">' +
        '<button type="button" id="startButton" onclick="switchToGameField()"><span>START</span></button>' +
        '<button type="button" id="recordsButton" onclick="switchToRecordsPage()"><span>RECORDS</span></button></div></div>';
    }

      renderMainPage();
      break;
    case 'game':
      PageHTML += '<h3>Правила:</h3>';
      PageHTML += '<div>..............</div>';
      PageHTML += '<button type="button" id="start" onclick="startGame()"><span>START</span></button>'
      break;
    case 'records':
      PageHTML += '<h3>Рекорды:</h3>';
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
}

function switchToRulesPage() {
  SwitchToState({pagename: 'rules'});
}

function switchToRecordsPage() {
  SwitchToState({pagename: 'records'});
}

function startGame() {
  mainPage.classList.add('hide');
  canv.classList.remove('hide');
  lounchGame();
}

SwitchToStateFromURLHash();