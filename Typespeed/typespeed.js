const newGameButton=document.getElementById("newGameBtn");
const question=document.getElementById("words");
const gameContainer=document.getElementById("game");
let currentWordIndex=0;
let currentLetterIndex=0;
let allLetters=[];
sampleTexts=["Before judging or mistreating someone, consider how you would feel in their place. A society thrives when people act with fairness, empathy, and respect toward one another.","Caring for others, even those who are different from you, creates stronger communities. True progress happens when people choose to uplift and support one another rather than tear each other down.","When faced with hostility or wrongdoing, reacting with anger or revenge only fuels more conflict. A person who remains patient and responds with goodness can break cycles of hatred and create real change.","It's easy to follow the crowd or accept what is convenient, but true wisdom comes from questioning, learning, and seeking what is just and right, even when it challenges your perspective.","People will always have expectations and judgments, but your value comes from your character and actions, not from external validation. Stay true to what is right, even if others don’t recognize it."];
function generateRandomText(){
    const randomIndex=Math.floor(Math.random()*sampleTexts.length);
    let sample=sampleTexts[randomIndex];
    sample=sample.split(" ");
    sample.forEach(word=>{
        question.appendChild(letterMakers(word));
    })
    allLetters=[...document.querySelectorAll(".letter")];
    if (allLetters.length>0){
        allLetters[0].classList.add("selected");
    }
}
function letterMakers(words){
    const wordDiv=document.createElement("div");
    wordDiv.classList.add('wordDiv');
    words.split("").forEach(letter=>{
        const letterSpan=document.createElement("span");
        letterSpan.textContent=letter;
        letterSpan.classList.add('letter');
        wordDiv.appendChild(letterSpan);
    });
    const spaceSpan=document.createElement("span");
    spaceSpan.textContent=" ";
    spaceSpan.classList.add("letter")
    wordDiv.appendChild(spaceSpan)
    return wordDiv;
}
function startGame(){
    currentLetterIndex=0;
    currentWordIndex=0;
    question.innerHTML="";
    generateRandomText();
}
function inputCheck(event){
    const ignore=["Shift", "Enter", "Tab", "CapsLock", "Control", "Alt", "Meta", 
        "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    if (ignore.includes(event.key))return;
    if (!allLetters || allLetters.length === 0) return; 
    if (event.key==="Backspace"){
        if (currentLetterIndex>0){
            allLetters[currentLetterIndex].classList.remove("selected")
            currentLetterIndex--;
            const previousLetter=allLetters[currentLetterIndex];
            previousLetter.classList.remove("correct","incorrect")
            previousLetter.classList.add("selected")
        }
        return;
    }
    const currentLetter=allLetters[currentLetterIndex];
    if (event.key===currentLetter.textContent){
        currentLetter.classList.add("correct");
        currentLetter.classList.remove("selected");
        currentLetterIndex++;
        if (currentLetterIndex<allLetters.length){
            allLetters[currentLetterIndex].classList.add("selected");
        }
    }
    else if(event.key!==currentLetter.textContent){
        currentLetter.classList.add("incorrect");
        currentLetter.classList.remove("selected");
        currentLetterIndex++;
        if (currentLetterIndex<allLetters.length){
            allLetters[currentLetterIndex].classList.add("selected");
        }
    }
    else if(event.key===" "){
        if (currentLetter.textContent===" "){
            currentWordIndex++;
            currentLetterIndex++;
        }
    }
    const correctCharacters=[...document.querySelectorAll(".correct")];
    const wrongCharacters=[...document.querySelectorAll(".incorrect")];
    const accuracy=document.getElementById("accuracyValue");
    let correctValue=correctCharacters.length;
    let incorrectValue=wrongCharacters.length;
    let accuracyValue=Math.round((correctValue/(correctValue+incorrectValue)*100)*100)/100;
    accuracy.textContent=accuracyValue;
    const cpmValue=document.getElementById("cpmValue");
    cpmValue.textContent=correctValue*2/5
}
document.addEventListener("keydown",inputCheck)
let timeleft=30;
let timeinterval;
    function countdown(){
        clearInterval(timeinterval);
        timeleft=30;
        document.getElementById("timeleft").textContent=timeleft;
        timeinterval=setInterval(()=>{
            timeleft--;
            document.getElementById("timeleft").textContent=timeleft;
            if (timeleft<=0){
                document.getElementById("timeleft").textContent="Times up!";
                document.removeEventListener("keydown", inputCheck);
            }
        },1000);
    }
newGameButton.addEventListener("click",function(){startGame();countdown();location.reload()});
startGame();
countdown();