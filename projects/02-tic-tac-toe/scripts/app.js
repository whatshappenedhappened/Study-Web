const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameOver = false;

// 플레이어 목록
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

// 모달
const modalControl = document.querySelector('#config-overlay');
const modalBackground = document.querySelector('#backdrop');
// 폼
const formElement = document.querySelector('form');
// 모달 에러
const errorsOutput = document.querySelector('#config-errors');
// 게임 영역
const gameArea = document.querySelector('#active-game');
const activePlayerName = document.querySelector('#active-player-name');
const turnMessage = document.querySelector('#turn-msg');



/**
 * 버튼 그룹
 */
// 플레이어 모달 Edit 버튼 동작
const editPlayer1Btn = document.querySelector('#edit-player-1-btn');
const editPlayer2Btn = document.querySelector('#edit-player-2-btn');
// 플레이어 Edit 모달 제어 버튼
const cancelEditBtn = document.querySelector('#cancel-button');
// 게임 시작 버튼
const startNewGameBtn = document.querySelector('#start-game-btn');
// 게임 보드 버튼
const gameFieldElements = document.querySelectorAll('#game-board li');
// 게임오버 메세지
const gameOverElement = document.querySelector('#game-over');

editPlayer1Btn.addEventListener('click', openPlayerConfig);
editPlayer2Btn.addEventListener('click', openPlayerConfig);

cancelEditBtn.addEventListener('click', closePlayerConfig);
modalBackground.addEventListener('click', closePlayerConfig);

startNewGameBtn.addEventListener('click', startNewGame);

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
}

// 폼 제어
formElement.addEventListener('submit', savePlayerConfig);