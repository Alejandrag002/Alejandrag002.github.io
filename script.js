
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

    // Fix NAVIGATION click behavior and insert wall quiz
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
});







