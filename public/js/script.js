

const typingText = document.querySelector(".typing-test p"),
ipnfield = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryagainbtn = document.querySelector("button"); 

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;


function randomParagraph() {
    //getting random number 
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML ="";
    //getting random itemfrom the paragraph array, spitting all characters
    //of it, adding each characters inside span then adding this span inside paragraph
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    // focusing input field on keydowns or click event
    document.addEventListener("keydown", () => ipnfield.focus());
    typingText.addEventListener("click", () => ipnfield.focus());
}
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typeChar = ipnfield.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }


        if (typeChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect")

        } else {
            if (characters[charIndex].innerText === typeChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");

            }
            charIndex++;

        }

        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        ipnfield.value= "";
        clearInterval(timer);
    }

}
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    ipnfield.value= "";
    clearInterval(timer);
    randomParagraph();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    mistakeTag.innerText = mistakes;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}
randomParagraph();
ipnfield.addEventListener("input", initTyping);
tryagainbtn.addEventListener("click", resetGame);


// const sr= ScrollReveal({
//     distance:'60px',
//     duration:2500,
//     delay:400,
//     reset: true
// })

// sr.reveal('p',{delay:200,origin:'top'})
$(".typing-nav").click(function() {
    $('html, body').animate({
        scrollTop: $("#typing").offset().top
    }, 1000);
});