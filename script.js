document.addEventListener("DOMContentLoaded", function () {
    showTab("home");

    // Attach nav link click
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const tabId = this.getAttribute("onclick").match(/'([^']+)'/)[1];

            if (tabId === "question") {
                askQuestion();
            } else {
                showTab(tabId);
            }

            // ALSO close hamburger menu on click
            const navLinks = document.getElementById("navLinks");
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
            }
        });
    });

    // Attach hamburger button click
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

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

    // Reveal button
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

    // Yes/No buttons
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

    // FOOD WHEEL CODE
    const foodOptions = [
        "Taco Bell", "Chick-fil-A", "Sushi", "Pizza", "In-N-Out", "Korean BBQ", "Thai Food", "Chipotle", "Fire Wings", "Wing Stop", "BWW", "Carne Asada Fries",
        "Jack in the box", "Panda Express", "Lucky Greek", "Poki", "Subway", "Jersey Mikes", "Chilis", "BJ's", "Texas Road House",
        "Olive Garden", "McDonalds", "Ono", "Waba Grill", "Farmer Boys", "Baker's", "Tacos", "Chicken Flautas", "Ice Cream", "You're Pretty", "Burger King", "Ono", "Raising Cane's",
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

            const colorA = "#95d5b2";
            const colorB = "#74c69d";
            ctx.fillStyle = i % 2 === 0 ? colorA : colorB;

            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(startAngle + angleStep / 2);
            ctx.fillStyle = "#2c3e50";
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

}); // <-- properly closing DOMContentLoaded
