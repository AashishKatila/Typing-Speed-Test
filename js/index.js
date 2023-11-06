const typingText = document.querySelector('.typing-text p')
inputField = document.querySelector(".input-field"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time b"),
cpmTag = document.querySelector(".cpm span"),
wpmTag = document.querySelector(".wpm span");

let charIndex = 0;
let mistakes = 0;
let timer ,maxTime = 60;
let timeLeft = maxTime;
let isTyping = false


function loadParagraph(){
    //shows random paragraph
    const randomIndex = Math.floor(Math.random()* paragraphs.length)
    // console.log(paragraphs[randomIndex])
    //splits paragraph by each word and adds character inside a span
    paragraphs[randomIndex].split("").forEach(span =>{
        let spantag = `<span>${span}</span>`
        typingText.innerHTML += spantag;
    })
    document.addEventListener("keydown",()=>inputField.focus())
    typingText.addEventListener("click",()=>inputField.focus())
}

function initTyping(){
    const characters = typingText.querySelectorAll("span")
    //Stores the typed character in the input field
    let typedCharacter = inputField.value.split("")[charIndex];
    // console.log(typedCharacter)
    if(!isTyping){
        timer = setInterval(initTimer,1000);
        isTyping = true;
    }
    if(typedCharacter == null){
        charIndex--;
        //decrement mistakes number only if typed character is wrong
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect")
    }
    else{
        if(characters[charIndex].innerText === typedCharacter){
            characters[charIndex].classList.add("correct")
        }
        else{
            //increments mistake
            mistakes++
            //adds incorrect class when typed wrong
            characters[charIndex].classList.add("incorrect")
        }
        charIndex++;
    }
    //To meke only active class blink
    characters.forEach(span => span.classList.remove("active"))
    //To meke active class blink
    characters[charIndex].classList.add("active")
    let wpm = Math.round((((charIndex-mistakes)/5)/(maxTime - timeLeft))*60)
     wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;
    //Shows no of mistakes
    mistakeTag.innerText = mistakes
    cpmTag.innerText = charIndex - mistakes
    wpmTag.innerText = wpm

}

function initTimer(){
    if(timeLeft>0){
        timeLeft--
        timeTag.innerText = timeLeft
    }
    else{
        clearInterval(timer)
    }
}


loadParagraph();
inputField.addEventListener("input",initTyping)