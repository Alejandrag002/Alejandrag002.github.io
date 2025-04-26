
// GLOBALS
function askQuestion() {

    
    const modal = document.getElementById("chinaQuestionModal");
    const input = document.getElementById("chinaAnswerInput");
    const submitBtn = document.getElementById("submitChinaAnswer");

    if (modal) {
        modal.style.display = "block";
        modal.classList.add("show");

        submitBtn.onclick = function () {
            const value = input.value.trim().replace(/,/g, ""); // Strip commas
            if (value === "13171") {
                modal.style.display = "none";
                showTab("question");
            } else {
                alert("That's not quite right. Try again!");
                input.value = "";
            }
        };
    }
}


function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.opacity = "0";
        activeTab.style.transform = "translateY(10px)";
        activeTab.classList.add("active");

        setTimeout(() => {
            activeTab.style.opacity = "1";
            activeTab.style.transform = "translateY(0)";
        }, 50);
    }
}

function startCelebration() {
    const questionSection = document.getElementById("question");
    if (questionSection) {
        questionSection.style.display = "none";
    }

    document.body.style.backgroundColor = "#1b3e2f";

    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    const ohYeahText = document.createElement("h1");
    ohYeahText.innerText = "OH YEAH!";
    ohYeahText.classList.add("oh-yeah-text");
    document.body.appendChild(ohYeahText);

    for (let i = 0; i < 150; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 4 + 2 + "s";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.classList.add("close-button", "show");
        closeButton.addEventListener("click", function () {
            window.location.href = "#home";
            location.reload();
        });
        document.body.appendChild(closeButton);
    }, 5000);
}

function showNewQuestion() {
    const firstQuestion = document.querySelector(".content-box h2");
    const btnGroup = document.querySelector(".btn-group");
    if (firstQuestion) firstQuestion.style.display = "none";
    if (btnGroup) btnGroup.style.display = "flex";
}

// INITIALIZATION

document.addEventListener("DOMContentLoaded", function () {
    showTab("home");

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const tabId = this.getAttribute("onclick").match(/'([^']+)'/)[1];

            if (tabId === "question") {
                askQuestion();
            } else {
                showTab(tabId);
            }
        });
    });

        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
           });

   }

    //});

    // Image hover 
    document.querySelectorAll(".image-box").forEach(box => {
        box.addEventListener("mouseover", function () {
            let imgSrc = this.getAttribute("data-image");
            let text = this.getAttribute("data-text");
            let hoverDisplay = document.querySelector(".hover-display");

            document.getElementById("hoverImage").src = imgSrc;
            document.getElementById("hoverText").textContent = text;
            hoverDisplay.style.display = "flex";
        });

        box.addEventListener("mouseleave", function () {
            document.querySelector(".hover-display").style.display = "none";
        });
    });

    // Reveal Button 
    const revealButton = document.getElementById("revealButton");
    const popupBox = document.getElementById("popupBox");
    const finalMessage = document.getElementById("finalMessage");

    if (revealButton) {
        revealButton.addEventListener("click", function () {
            if (popupBox) popupBox.classList.add("show");
            revealButton.style.display = "none";
            if (finalMessage) finalMessage.classList.remove("hidden");
            showNewQuestion();
        });
    }

    // Yes/No Buttons
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    if (yesButton) {
        yesButton.addEventListener("click", function () {
            startCelebration();
        });
    }

    if (noButton) {
        noButton.addEventListener("mouseover", function () {
            let randomX = Math.random() * (window.innerWidth - 100);
            let randomY = Math.random() * (window.innerHeight - 100);
            this.style.left = randomX + "px";
            this.style.top = randomY + "px";
        });
    }

    // Hide contact section on "sii" click
    const contactSection = document.querySelector(".contact-section");
    if (yesButton && contactSection) {
        yesButton.addEventListener("click", function () {
            contactSection.style.display = "none";
        });
    }
    const foodOptions = [
        "Taco Bell", "Chick-fil-A", "Sushi", "Pizza", "In-N-Out", "Korean BBQ", "Thai Food", "Chipotle", "Fire Wings","Wing Stop", "BWW","Carne Asada Fries", 
        "Jack in the box", "Panda Express", "Lucky Greek", "Poki", "Subway", "Jersey Mikes", "Chilis", "BJ's", "Texas Road House", 
        "Olive Garden", "McDonalds", "Ono", "Waba Grill", "Farmer Boys", "Baker's", "Tacos", "Chicken Flautas", "Ice Cream","You're Pretty", "Burger King", "Ono", "Raising Cane's",
    ];
    
    const canvas = document.getElementById("foodWheel");
    const ctx = canvas?.getContext("2d");
    const spinButton = document.getElementById("spinButton");
    const resultText = document.getElementById("resultText");
    
    let angle = 0;
    let isSpinning = false;
    
    function drawWheel() {
        const radius = canvas.width / 2;
        const angleStep = (2 * Math.PI) / foodOptions.length;
    
        for (let i = 0; i < foodOptions.length; i++) {
            const startAngle = angleStep * i;
            const endAngle = startAngle + angleStep;
    
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, startAngle, endAngle);
    
            // Aesthetic two-tone palette
            const colorA = "#95d5b2"; // mint green
            const colorB = "#74c69d"; // soft sage
            ctx.fillStyle = i % 2 === 0 ? colorA : colorB;
    
            ctx.fill();
            ctx.stroke();
    
            // Add label
            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(startAngle + angleStep / 2);
            ctx.fillStyle = "#2c3e50"; // match site text
            ctx.font = "14px 'STIX Two Text', serif";
            ctx.textAlign = "right";
            ctx.fillText(foodOptions[i], radius - 10, 5);
            ctx.restore();
        }
    }
    
    
    
    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
    
        const spinAngle = Math.random() * 360 + 360 * 5;
        const duration = 4000;
        const start = performance.now();
    
        function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            angle = (spinAngle * progress) * (Math.PI / 180);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();
    
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                const index = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) / (2 * Math.PI)) * foodOptions.length) % foodOptions.length;
                resultText.textContent = `We should eat: ${foodOptions[index]} `;
                isSpinning = false;
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    if (spinButton) {
        drawWheel();
        spinButton.addEventListener("click", spinWheel);
    }
    
    

});
