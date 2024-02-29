let textInput = document.querySelector('input');
const MAXIMUM = 60;

function traceLength(event) {
    let remain = document.querySelector('span #now');
    remain.textContent = 60 - event.target.value.length;

    if (remain.textContent <= 10) {
        event.target.style.backgroundColor = "rgb(162, 30, 30)";
    }
    else {
        event.target.style = "background-color: inherit;";
    }
}

textInput.addEventListener('input', traceLength);

textInput.style.backgroundColor = "rgb(162, 30, 30)";