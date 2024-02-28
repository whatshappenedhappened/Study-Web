let editedPlayer = 0;

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

// 모달 변수
const modalControl = document.querySelector('#config-overlay');
const modalBackground = document.querySelector('#backdrop');
// 폼 변수
const formElement = document.querySelector('form');
// 모달 에러 변수
const errorsOutput = document.querySelector('#config-errors');

// 플레이어 모달 Edit 버튼 동작
const editPlayer1BtnElement = document.querySelector('#edit-player-1-btn');
const editPlayer2BtnElement = document.querySelector('#edit-player-2-btn');

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

// 플레이어 Edit 모달 제어
const cancelEditButton = document.querySelector('#cancel-button');

cancelEditButton.addEventListener('click', closePlayerConfig);
modalBackground.addEventListener('click', closePlayerConfig);

// 폼 제어
formElement.addEventListener('submit', savePlayerConfig);