// Initialize global variables
let timer_text, accuracy_text, error_text, cpm_text, wpm_text, quote_text;
let input_area, restart_btn, cpm_group, wpm_group, error_group, accuracy_group;
let timeLeft, timeElapsed, total_errors, errors, accuracy, characterTyped;
let current_quote, quoteNo, timer, TIME_LIMIT = 60, quotes_array;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    timer_text = document.querySelector(".curr_time");
    accuracy_text = document.querySelector(".curr_accuracy");
    error_text = document.querySelector(".curr_errors");
    cpm_text = document.querySelector(".curr_cpm");
    wpm_text = document.querySelector(".curr_wpm");
    quote_text = document.querySelector(".quote");
    input_area = document.querySelector(".input_area");
    restart_btn = document.querySelector(".restart_btn");
    cpm_group = document.querySelector(".cpm");
    wpm_group = document.querySelector(".wpm");
    error_group = document.querySelector(".errors");
    accuracy_group = document.querySelector(".accuracy");

    // Dark mode toggle
    const toggle = document.getElementById('dark-mode-toggle');
    toggle?.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme', this.checked);
    });

    // Set text button listener
    const setTextButton = document.getElementById('set-text-button');
    setTextButton?.addEventListener('click', setCustomText);

    // Default quotes
    quotes_array = [
        "Push yourself, because no one else is going to do it for you.",
        // ... other predefined quotes
    ];

    resetValues();
});

function setCustomText() {
    const userTextInput = document.getElementById('user-text-input').value;
    if (userTextInput.trim().length > 0) {
        const sentences = userTextInput.match(/[^.!?]+[.!?]+/g);
        if (sentences && sentences.length > 0) {
            quotes_array = sentences.map(sentence => sentence.trim());
            setDynamicTimeLimit(quotes_array);
            resetValues();
            updateQuote();
        } else {
            alert('Please enter a text with full sentences.');
        }
    } else {
        alert('Please paste some text into the box.');
    }
}

function setDynamicTimeLimit(quotes) {
    const totalWords = quotes.join(' ').split(' ').length;
    const wordsPerMinute = 30;
    TIME_LIMIT = Math.ceil((totalWords / wordsPerMinute) * 60);
    timeLeft = TIME_LIMIT;
    timer_text.textContent = timeLeft + 's';
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";

    updateQuote();
}

function updateQuote() {
    quote_text.textContent = '';
    current_quote = quotes_array[quoteNo];

    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    });

    if (quoteNo < quotes_array.length - 1) {
        quoteNo++;
    } else {
        quoteNo = 0;
    }
}

function processCurrentText() {
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;
    errors = 0;

    const quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        const typedChar = curr_input_array[index];

        if (typedChar == null) {
            char.classList.remove('correct_char', 'incorrect_char');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });

    error_text.textContent = total_errors + errors;

    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length == current_quote.length) {
        updateQuote();
        total_errors += errors;
        input_area.value = "";
    }
}

function startGame() {
    resetValues();
    updateQuote();
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timer_text.textContent = timeLeft + "s";
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    input_area.disabled = true;
    quote_text.textContent = "Click on restart to start a new game.";
    restart_btn.style.display = "block";

    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

// Add event listeners for user input
input_area.addEventListener('input', processCurrentText);
restart_btn.addEventListener('click', startGame);
