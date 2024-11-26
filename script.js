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



const texts = [
    "Smarter",
    "Tailored",
    "Adaptive",
    "Robust",
    "Scalable",
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
                appendMessage("Genie", "I will check and get back to you.");
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

function autoScroll() {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide);
}

setInterval(autoScroll, 3000); // Change slide every 3 seconds

document.querySelector('.carousel').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.carousel').addEventListener('touchmove', handleTouchMove, false);

let xStart = null;

function handleTouchStart(evt) {
    xStart = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    if (!xStart) {
        return;
    }

    let xEnd = evt.touches[0].clientX;
    let xDiff = xStart - xEnd;

    if (xDiff > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }

    moveToSlide(currentSlide);
    xStart = null;
}

