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


document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    // Function to append a message to the chat
    function appendMessage(name, text, isUser = false) {
        const message = document.createElement("div");
        message.classList.add("message", isUser ? "user" : "bit");

        const nameElem = document.createElement("div");
        nameElem.classList.add("name");
        nameElem.textContent = name;

        const textElem = document.createElement("div");
        textElem.classList.add("text");
        textElem.textContent = text;

        message.appendChild(nameElem);
        message.appendChild(textElem);
        chatMessages.appendChild(message);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for sending a message
    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (text) {
            appendMessage("User", text, true);
            userInput.value = "";

            // Simulated bot reply
            setTimeout(() => {
                appendMessage("AI SUJITH", "I will check and get back to you.");
            }, 1000);
        }
    });

    // Allow pressing Enter to send the message
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });
});

// Carousel functionality
let currentIndex = 0;
let touchStartX = 0; // Store the initial touch position for swipe detection
let touchEndX = 0;   // Store the final touch position for swipe detection

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const totalCards = document.querySelectorAll('.card').length;
    currentIndex = (currentIndex + direction + totalCards) % totalCards;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Swipe detection for mobile devices
function handleSwipeStart(event) {
    touchStartX = events.touches[0].clientX; // Get the touch start position
}

function handleSwipeEnd(event) {
    touchEndX = event.changedTouches[0].clientX; // Get the touch end position

    if (touchStartX - touchEndX > 50) {
        // Swipe left, move to the next card
        moveCarousel(1);
    } else if (touchEndX - touchStartX > 50) {
        // Swipe right, move to the previous card
        moveCarousel(-1);
    }
}

// Add event listeners for swipe functionality
document.querySelector('.carousel-container').addEventListener('touchstart', handleSwipeStart); // Detect touch start
document.querySelector('.carousel-container').addEventListener('touchend', handleSwipeEnd);   // Detect touch end




document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;
    let autoScroll;

    function scrollNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        carouselContainer.scrollTo({
            left: carouselContainer.clientWidth * currentIndex,
            behavior: 'smooth'
        });
    }

    function startAutoScroll() {
        autoScroll = setInterval(scrollNext, 3000); // Scroll every 3 seconds
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    if (window.innerWidth <= 800) {
        startAutoScroll();
    }

    carouselContainer.addEventListener('touchstart', stopAutoScroll); // Stop scrolling on touch
});



