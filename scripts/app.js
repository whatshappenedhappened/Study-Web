// 모달 변수
const modalControl = document.querySelector('#config-overlay');
const modalBackground = document.querySelector('#backdrop');

// 플레이어 모달 Edit 버튼 동작
const editPlayer1BtnElement = document.querySelector('#edit-player-1-btn');
const editPlayer2BtnElement = document.querySelector('#edit-player-2-btn');

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

// 플레이어 Edit 모달 제어
const cancelEditButton = document.querySelector('#cancel-button');

cancelEditButton.addEventListener('click', cancelPlayerConfig);
modalBackground.addEventListener('click', cancelPlayerConfig);
