const texts = [
    "Smarter",
    "Tailored",
    "Adaptive",
    "Robust",
    "Scaleable",
    "Reliable",
    "Versatile",
    "Strategic"
];
let index = 0;

function changeText() {
    const animatedText = document.querySelector('.animated-text');
    animatedText.textContent = texts[index];
    index = (index + 1) % texts.length;
}

setInterval(changeText, 4000);
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}



function generateSessionId() {
    return 'session-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

const sessionId = generateSessionId();
console.log("Session ID:", sessionId);

document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    let chatHistory = [];

    function appendMessage(name, text, isUser = false) {
        const message = document.createElement("div");
        message.classList.add("message", isUser ? "user" : "bot");

        const nameElem = document.createElement("div");
        nameElem.classList.add("name");
        nameElem.textContent = name;

        const textElem = document.createElement("div");
        textElem.classList.add("text");
        textElem.textContent = text;

        message.appendChild(nameElem);
        message.appendChild(textElem);
        chatMessages.appendChild(message);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    appendMessage("Sujith", "Hi, I’m Sujith Sivasankaran! Feel free to ask me anything about myself. I’ll answer your questions, so you can get to know me better. Think of me as your interactive resume bot!");

    function showTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.id = "typingIndicator";
        typingIndicator.textContent = "Sujith is typing...";
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById("typingIndicator");
        if (typingIndicator) typingIndicator.remove();
    }


    async function getReplyFromServer(userText) {
        const url = 'https://knowmebot.onrender.com/chat';
        const params = {
            question: userText,
            chat_history: JSON.stringify(chatHistory),
            session_id: sessionId
        };

        try {
            showTypingIndicator();
            sendBtn.textContent = "Wait...";
            sendBtn.style.backgroundColor = "red";
            sendBtn.disabled = true;

            const response = await fetch(`${url}?${new URLSearchParams(params)}`);
            removeTypingIndicator();
            sendBtn.disabled = false;
            sendBtn.textContent = "Send";
            sendBtn.style.backgroundColor = "#2b3a7b";

            if (response.ok) {
                const data = await response.json();
                return data.answer;
            } else {
                console.error(`Error: ${response.status}`);
                return "Sorry, I couldn't get a response from the server.";
            }
        } catch (error) {
            console.error("Error:", error);
            removeTypingIndicator();
            sendBtn.disabled = false;
            return "Sorry, there was an error connecting to the server.";
        }
    }


    sendBtn.addEventListener("click", async () => {
        const text = userInput.value.trim();
        if (text) {
            appendMessage("User", text, true);
            userInput.value = "";

            const reply = await getReplyFromServer(text);
            appendMessage("Sujith", reply);


            chatHistory.push([text, reply]);
        }
    });


    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });
});




let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel .card').length;

function updateIndicators() {
    document.querySelectorAll('.carousel-indicators .indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function moveToSlide(slideIndex) {
    currentSlide = slideIndex;
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateIndicators();
}

// function autoScroll() {
//     currentSlide = (currentSlide + 1) % totalSlides;
//     moveToSlide(currentSlide);
// }

// setInterval(autoScroll, 3000);

let xStart = null;
let yStart = null;
const threshold = 10; // Minimum distance to detect as a swipe

function handleTouchStart(evt) {
    xStart = evt.touches[0].clientX;
    yStart = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xStart || !yStart) {
        return;
    }

    const xEnd = evt.touches[0].clientX;
    const yEnd = evt.touches[0].clientY;

    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;

    // Determine if swipe is horizontal or vertical
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > threshold) {
        // Horizontal swipe detected
        evt.preventDefault(); // Prevent scrolling for horizontal swipes
        if (xDiff > 0) {
            // Swipe left
            currentSlide = (currentSlide + 1) % totalSlides;
            moveToSlide(currentSlide);
        } else {
            // Swipe right
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            moveToSlide(currentSlide);
        }

        // Reset touch positions after processing the swipe
        xStart = null;
        yStart = null;
    }
}

function handleTouchEnd() {
    xStart = null;
    yStart = null;
}


// Event listeners
const carousel = document.querySelector('.carousel');
carousel.addEventListener('touchstart', handleTouchStart, false);
carousel.addEventListener('touchmove', handleTouchMove, false);
carousel.addEventListener('touchend', handleTouchEnd, false);
carousel.addEventListener('touchcancel', handleTouchEnd, false);
