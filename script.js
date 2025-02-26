document.addEventListener("DOMContentLoaded", function () {
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

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const tabId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showTab(tabId);
        });
    });

    showTab("home");

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

    const revealButton = document.getElementById("revealButton");
    const finalMessage = document.getElementById("finalMessage");
    const firstQuestion = document.querySelector(".content-box h2");
    const btnGroup = document.querySelector(".btn-group");

    function showNewQuestion() {
        if (firstQuestion) {
            firstQuestion.style.display = "none";
        }
        if (btnGroup) {
            btnGroup.style.display = "flex";
        }
    }

    if (revealButton && finalMessage) {
        revealButton.addEventListener("click", function () {
            revealButton.style.display = "none";
            finalMessage.classList.remove("hidden");
            showNewQuestion();
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const revealButton = document.getElementById("revealButton");
    const popupBox = document.getElementById("popupBox");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    // Show the popup when "Click to Reveal" is clicked
    if (revealButton && popupBox) {
        revealButton.addEventListener("click", function () {
            popupBox.classList.add("show");
        });
    }

    // 🎉 Confetti Effect when "Yes" is clicked
    if (yesButton) {
        yesButton.addEventListener("click", function () {
            startConfetti();
        });
    }

    // 🏃 Make the "No" button run away when hovered
    if (noButton) {
        noButton.addEventListener("mouseover", function () {
            let randomX = Math.random() * (window.innerWidth - 100);
            let randomY = Math.random() * (window.innerHeight - 100);
            this.style.left = randomX + "px";
            this.style.top = randomY + "px";
        });
    }
});


// 🎉 Full Effect: Dark Green Screen + Confetti + "OH YEAH!" + Close Button
function startCelebration() {
    // Hide the question section
    const questionSection = document.getElementById("question");
    if (questionSection) {
        questionSection.style.display = "none";
    }

    // Change background color
    document.body.style.backgroundColor = "#1b3e2f"; // Dark Green

    // Create confetti container
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    // Create "OH YEAH!" text
    const ohYeahText = document.createElement("h1");
    ohYeahText.innerText = "OH YEAH!";
    ohYeahText.classList.add("oh-yeah-text");
    document.body.appendChild(ohYeahText);

    // Generate confetti pieces
    for (let i = 0; i < 150; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 4 + 2 + "s";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    // After 5 seconds, show Close Button
    setTimeout(() => {
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.classList.add("close-button", "show"); // Make sure it appears
        closeButton.addEventListener("click", function () {
            window.location.href = "#home"; // Redirect to home
            location.reload(); // Reload page to reset everything
        });
        document.body.appendChild(closeButton);
    }, 5000);
}

// Attach Celebration Effect to Yes Button
document.addEventListener("DOMContentLoaded", function () {
    const yesButton = document.getElementById("yesButton");
    if (yesButton) {
        yesButton.addEventListener("click", function () {
            startCelebration();
        });
    }
});



