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

    setInterval(changeText, 4001);

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
  


document.querySelector('.carousel').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.carousel').addEventListener('touchmove', handleTouchMove, false);
document.querySelector('.carousel').addEventListener('touchend', handleTouchEnd, false);
document.querySelector('.carousel').addEventListener('touchcancel', handleTouchEnd, false);

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
    xStart = null;
}

function handleTouchEnd(evt) {
    xStart = null;
}
    

