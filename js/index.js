const typingText = document.querySelector('.typing-text p')
inputField = document.querySelector(".input-field"),
mistakeTag = document.querySelector(".mistake span")

let charIndex = 0;
let mistakes = 0;


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
    //Shows no of mistakes
    mistakeTag.innerText = mistakes
}


loadParagraph();
inputField.addEventListener("input",initTyping)