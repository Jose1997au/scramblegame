const randomWords = [
    "mango",
    "subway",
    "astronomy",
    "candle",
    "broccoli",
    "pineapple",
    "piano",
    "zebra",
    "jazz",
    "moonlight",
    "tiger",
    "harmony",
    "waterfall",
    "peacock",
    "guitar",
    "dragonfly",
    "lavender",
    "chocolate",
    "dandelion",
    "rainbow",
    "carousel",
    "chameleon",
    "cinnamon",
    "sunflower",
    "octopus"
];

let currentChosenWord;

function scrambleWord() {
    const scrambledWordDispaly = $(".scrambled-word");
    if (!currentChosenWord) {
        currentChosenWord = randomWords[0];
    }
    let lettersArray = currentChosenWord.split("");
    const currentLength = lettersArray.length;
    let newWord = "";
    for (let i = 0; i < currentLength; i++) {
        let weight = Math.floor(Math.random() * lettersArray.length);
        newWord += lettersArray[weight];
        lettersArray.splice(weight, 1);
    }
    scrambledWordDispaly.text(newWord);
}

function chooseWord() {
    let infoText = $("#scrambled-info-display")
    let newRandomWords = JSON.parse(localStorage.getItem("myData"));
    if (newRandomWords == null) {
        newRandomWords = randomWords;
    }
    let weight = Math.floor(Math.random() * newRandomWords.length);
    currentChosenWord = newRandomWords[weight];
    infoText.text("-");
    infoText.css("color", "black")
    scrambleWord();
}

function updateWordList() {
    const wordList = $("#rt-word-list");
    let newRandomWords = JSON.parse(localStorage.getItem("myData"));
    if (newRandomWords == null) {
      newRandomWords = randomWords;
    }
    console.log(newRandomWords);
    wordList.empty(); // Supposed to clear out the word list.
    for (let i = 0; i < newRandomWords.length; i++) {
      const listItem = $("<li>").text(newRandomWords[i]);
      wordList.append(listItem);
    }
}
  

$(document).ready(function() {
    chooseWord();
    updateWordList();
});

function addWord() {
    const infoDisplay = $("#info-display");
    let newRandomWords = JSON.parse(localStorage.getItem("myData"));
    if (newRandomWords == null) {
        newRandomWords = randomWords;
    }
    let dupeWordFound = false;
    let word = $(".word-form-control").val().toLowerCase();
    if (word) {
        if (word.includes(" ")) {
            infoDisplay.text("Make sure your word does not include spaces.");
            infoDisplay.css("color", "red");
            console.log("Make sure your word does not include spaces.");
            return
        }
        for (let i = 0 ; i < newRandomWords.length ; i++) {
            if (newRandomWords[i] == word) {
                dupeWordFound = true;
                infoDisplay.text("Word is already in list.");
                infoDisplay.css("color", "red");
                console.log("Word is already in list.");
            }
        }
        if (!dupeWordFound) {
            newRandomWords.push(word);
            // Array has been edited to include our new word
            infoDisplay.text(word + ' has been added to the list.');
            infoDisplay.css("color", "green");
            console.log(word + ' has been added to the list.');
            localStorage.setItem("myData", JSON.stringify(newRandomWords));
            updateWordList();
        }
    } else {
        // Input has not been found
        infoDisplay.text("A word has not been added in the input.");
        infoDisplay.css("color", "red");
        console.log("A word has not been added in the input.");
    }
}

function removeWord() {
    const infoDisplay = $("#info-display");
    let newRandomWords = JSON.parse(localStorage.getItem("myData"));
    if (newRandomWords == null) {
        newRandomWords = randomWords;
    }
    let word = $(".word-form-control").val().toLowerCase();
    let targetIndex = newRandomWords.indexOf(word);
    if (word) {
        if (targetIndex > -1) {
            newRandomWords.splice(targetIndex, 1);
            infoDisplay.text(word + ' has been deleted from the list');
            infoDisplay.css("color", "green");
            console.log(word + ' has been deleted from the list');
            localStorage.setItem("myData", JSON.stringify(newRandomWords));
            updateWordList();
        } else {
            // Word has not been found.
            infoDisplay.text("Word inside input has not been found.");
            infoDisplay.css("color", "red");
            console.log("Word inside input has not been found.");
        }
    } else {
        // Input has not been added
        infoDisplay.text("A word has not been added in the input.");
        infoDisplay.css("color", "red");
        console.log("A word has not been added in the input.");
    }
}


function guessWord() {
    let infoText = $("#scrambled-info-display")
    let clientGuess = $(".word-form-control").val().toLowerCase();
    if (clientGuess == currentChosenWord) {
        infoText.text("Correct! The answer is " + currentChosenWord + ".");
        infoText.css("color", "green")
    } else {
        infoText.text("Wrong. Try again");
        infoText.css("color", "red");
    }
}