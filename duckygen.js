const wordListTextArea = document.getElementById("word-list");
const generateSecurePasswordsButton = document.getElementById("generate-secure-passwords");
const generateSimplePasswordsButton = document.getElementById("generate-simple-passwords");
const generatedPasswordsContainer = document.getElementById("generated-passwords");
const quantityInput = document.getElementById("quantity");
const toast = document.getElementById("toast");

// Array to store generated passwords
let generatedPasswords = [];

// Load initial word list from the server
fetch("wordlist.txt")
    .then(response => response.text())
    .then(data => {
        wordListTextArea.value = data;
        generateSimplePasswords()
    })
    .catch(error => console.error("Error loading word list:", error));

generateSecurePasswordsButton.addEventListener("click", generateSecurePasswords);
generateSimplePasswordsButton.addEventListener("click", generateSimplePasswords);


function generateSecurePasswords() {
    const wordList = wordListTextArea.value.split('\n').map(word => word.trim());
    wordList.pop(); // Remove the last empty line

    if (wordList.length < 3) {
        alert("Please provide at least three words in the list.");
        return;
    }

    const numPasswords = parseInt(quantityInput.value, 10);
    if (isNaN(numPasswords) || numPasswords < 1) {
        alert("Please enter a valid number of passwords.");
        return;
    }

    const randomIndex = () => Math.floor(Math.random() * wordList.length);
    const symbols = "!%^&*()+=@?#";

    generatedPasswordsContainer.innerHTML = ''; // Clear previous passwords
    generatedPasswords = []; // Clear the stored passwords

    for (let i = 0; i < numPasswords; i++) {
        const selectedWords = Array.from({ length: 3 }, () => {
            const index = randomIndex();
            const word = wordList[index];
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 10);

        // Generate a random symbol from the symbols array
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

        // Create an array with one number and one symbol
        const characters = [randomNumber, randomSymbol];

        // Shuffle the characters to randomize their order
        for (let j = characters.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [characters[j], characters[k]] = [characters[k], characters[j]];
        }

        // Construct the password by combining the characters and selected words
        const password = `${selectedWords[0]}${characters[0]}${selectedWords[1]}${characters[1]}${selectedWords[2]}`;

        generatedPasswords.push(password);

        const passwordElement = document.createElement('div');
        passwordElement.textContent = password;
        generatedPasswordsContainer.appendChild(passwordElement);
        passwordElement.style.cursor = "pointer";
    }
}



function generateSimplePasswords() {
    const wordList = wordListTextArea.value.split('\n').map(word => word.trim());
    wordList.pop(); // Remove the last empty line

    if (wordList.length < 2) {
        alert("Please provide at least two words in the list.");
        return;
    }

    const numPasswords = parseInt(quantityInput.value, 10);
    if (isNaN(numPasswords) || numPasswords < 1) {
        alert("Please enter a valid number of passwords.");
        return;
    }

    const randomIndex = () => Math.floor(Math.random() * wordList.length);
    generatedPasswordsContainer.innerHTML = ''; // Clear previous passwords
    generatedPasswords = []; // Clear the stored passwords

    for (let i = 0; i < numPasswords; i++) {
        const randomDigits = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10));
        const selectedWords = Array.from({ length: 2 }, () => {
            const index = randomIndex();
            const word = wordList[index];
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        const password = `${selectedWords[0]}${selectedWords[1]}${randomDigits[0]}${randomDigits[1]}`;

        generatedPasswords.push(password);

        const passwordElement = document.createElement('div');
        passwordElement.textContent = password;
        generatedPasswordsContainer.appendChild(passwordElement);
        passwordElement.style.cursor = "pointer";
    }
}

generatedPasswordsContainer.addEventListener("click", function () {
    copyAllPasswords();
});

function copyAllPasswords() {
    const passwordsToCopy = generatedPasswords.join('\n');

    if (passwordsToCopy) {
        const tempInput = document.createElement("textarea");
        tempInput.value = passwordsToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        // Show toast notification
        toast.style.display = "block";

        setTimeout(function () {
            // Hide toast notification after 2 seconds
            toast.style.display = "none";
        }, 1250);
    }
}
