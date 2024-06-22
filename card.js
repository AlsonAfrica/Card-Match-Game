const values = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']; // Pair of values for the cards
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    createBoard();
    shuffle();
});

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board
    values.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('flip-box');
        card.innerHTML = `
            <div class="flip-box-inner" data-value="${value}">
                <div class="flip-box-front">
                    <h2></h2>
                </div>
                <div class="flip-box-back">
                    <h2>${value}</h2>
                </div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.querySelector('.flip-box-inner').classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.flip-box-inner').dataset.value === secondCard.querySelector('.flip-box-inner').dataset.value;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    updateScore();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.querySelector('.flip-box-inner').classList.remove('flip');
        secondCard.querySelector('.flip-box-inner').classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateScore() {
    score += 1;
    document.querySelector('.Score').innerText = score;
    if (score === values.length / 2) {
        alert("Congratulations! You've matched all pairs!");
    }
}

function shuffle() {
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }
}

function restart() {
    score = 0;
    document.querySelector('.Score').innerText = score;
    shuffle();
    createBoard();
}