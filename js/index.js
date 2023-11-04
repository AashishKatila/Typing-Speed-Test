const typingText = document.querySelector('.typing-text p')
inputField = document.querySelector(".input-field")

let charIndex = 0;

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
    if(characters[charIndex].innerText === typedCharacter){
        characters[charIndex].classList.add("correct")
    }
    else{
        characters[charIndex].classList.add("incorrect")
    }
    charIndex++;
}


loadParagraph();
inputField.addEventListener("input",initTyping)