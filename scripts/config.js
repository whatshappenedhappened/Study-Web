// 플레이어 섹션 Edit 버튼 함수
function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;  // 형변환
    modalControl.style.display = 'block';
    modalBackground.style.display = 'block';
}

// 플레이어 이름 편집 모달 제어 함수
function closePlayerConfig() {
    const nameInput = document.querySelector('#playername');

    // 기존 입력 초기화
    nameInput.value = '';
    formElement.firstElementChild.classList.remove('error');
    errorsOutput.textContent = '';

    modalControl.style.display = 'none';
    modalBackground.style.display = 'none';
}

// 폼 제출 함수
function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playername').trim();    // trim()메서드로 공백 제거

    // 간단한 유효성 검사
    if (!enteredPlayerName) {
        event.target.firstElementChild.classList.add('error');
        errorsOutput.textContent = "Please enter a valid name!";
        return;
    }

    // 플레이어 1과 2중에서 선택 후 업데이트
    const updatedPlayerData = document.querySelector(`#player-${editedPlayer}-data`);
    updatedPlayerData.children[1].textContent = enteredPlayerName;
    // 승자 출력에 사용할 배열에 플레이어 이름 저장
    players[editedPlayer - 1].name = enteredPlayerName;
    console.log(players[editedPlayer - 1]);
}