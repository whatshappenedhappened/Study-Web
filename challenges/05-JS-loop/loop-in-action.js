// 숫자 덧셈 기능
const sumBtn = document.querySelector('#calculator button');

function calculateSum() {
    const userNum = document.querySelector('#user-number');
    const showResult = document.querySelector('#calculated-sum');
    let sum = 0;

    for(let i = 0; i <= userNum.value; i++) {
        sum += i;
    }
    showResult.style.display = 'block';
    showResult.textContent = sum;    
}

sumBtn.addEventListener('click', calculateSum);



// 링크 하이라이트 기능
const highlightLinksButton = document.querySelector('#highlight-links button');

function highlightLinks() {
    const anchorElements = document.querySelectorAll("#highlight-links a");

    for(let a of anchorElements) {
        a.classList.add('highlight');
    }
}

highlightLinksButton.addEventListener('click', highlightLinks);



// 사용자 데이터 표시 기능
const dummyUserData = {
    이름: '김민영',
    나이: 28,
    장래희망: '웹 개발자',
    취미: '코딩, 헬스, 독서'
}

const displayUserDataButton = document.querySelector('#user-data button');

function displayUserData() {
    const ul = document.querySelector('#output-user-data');
    
    ul.innerHTML = '';

    for (const key in dummyUserData) {
        const li = document.createElement('li');
        li.textContent = key + ': ' + dummyUserData[key];
        ul.append(li);
    }

}

displayUserDataButton.addEventListener('click', displayUserData);



// 통계
const rollDiceButton = document.querySelector('#statistics button');

function rollDice() {

    return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
    const targetNumber = document.querySelector('#user-target-number');
    const ul = document.querySelector('#dice-rolls');
    
    ul.innerHTML = '';
    
    let targetFlag = false;
    let tried = 0;

    while (!targetFlag) {
        const rolledNumber = rollDice();

        const rollList = document.createElement('li');
        rollList.textContent = `결과: ${rolledNumber}`;
        ul.append(rollList);
        targetFlag = rolledNumber == +targetNumber.value;
        tried++;
    }

    const outputTotalRolls = document.querySelector('#output-total-rolls');
    const outputTargetNumber = document.querySelector('#output-target-number');

    outputTotalRolls.textContent = tried;
    outputTargetNumber.textContent = targetNumber.value;
}

rollDiceButton.addEventListener('click', deriveNumberOfDiceRolls);
