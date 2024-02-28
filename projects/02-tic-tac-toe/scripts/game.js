function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOver = false;

    gameOverElement.firstElementChild.innerHTML =
        '<h2>승자는 <span id="winner">Player Name</span>!</h3>';
    
    gameOverElement.style.display = 'none';
    turnMessage.style.display = 'block';

    // 보드 데이터 초기화
    let gameBoardIdx = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameFieldElements[gameBoardIdx].textContent = '';
            gameFieldElements[gameBoardIdx++].classList.remove('disabled');
        }
    }

}

function startNewGame() {

    if (!players[0].name || !players[1].name) {
        alert('양쪽 플레이어의 이름을 입력해주세요.')
        return;
    }

    resetGameStatus();

    activePlayerName.textContent = players[activePlayer].name;
    gameArea.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 1) {
        activePlayer = 0;
    } else {
        activePlayer = 1;
    }
    activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {

    // 중복 선택 방지, 라운드 처리
    if (event.target.classList[0] == 'disabled' || gameOver) {
        return;
    }

    // 게임 데이터 추적, 형변환 주의
    const selectedField = event.target;
    const selectedRow = +selectedField.dataset.row;
    const selectedColumn = +selectedField.dataset.col;

    // 중복 선택 방지 2
    // if (gameData[selectedRow][selectedColumn] > 0) {
    //     return;
    // }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    let winner = checkForGameOver(selectedRow, selectedColumn);
    if (winner !== 0) {
        console.log('darn');
        endGame(winner);
    }
    // endGame(checkForGameOver(selectedRow, selectedColumn));

    currentRound++;

    // 플레이어 변경
    switchPlayer();
}

function checkForGameOver(selectedRow, selectedColumn) {
    // 직선 열, 직선 행 체크
    if (gameData[selectedRow][0] === gameData[selectedRow][1] &&
        gameData[selectedRow][1] === gameData[selectedRow][2]
    ) {
        return gameData[selectedRow][selectedColumn];
    } else if (
        gameData[0][selectedColumn] === gameData[1][selectedColumn] &&
        gameData[1][selectedColumn] === gameData[2][selectedColumn]
    ) {
        return gameData[selectedRow][selectedColumn];
    }

    // 대각선 체크
    if (gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[1][1];
    } else if (
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]
    ) {
        return gameData[1][1];
    }

    // 무승부(최대 라운드) 체크
    if (currentRound > 8) {
        console.log('no way');
        return -1;
    }

    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    turnMessage.style.display = 'none';
    gameOver = true;
    
    if (winnerId > 0) {
        gameOverElement.querySelector('span').textContent = players[--winnerId].name;
    } else {
        gameOverElement.querySelector('h2').textContent = "무승부!";
    }

}