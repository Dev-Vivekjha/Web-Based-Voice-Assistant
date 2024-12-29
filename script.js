let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()

    if (hours >= 0 && hours < 12) {
        speak("Namaste! Good morning! sir")
    }
    else if (hours >= 12 && hours < 17) {
        speak("Namaste! Good afternoon sir")
    }
    else {
        speak("Namaste! Good Evening sir")
    }
}

window.addEventListener('load', ()=>{
    wishMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.textContent = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", ()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello sir")
    }
    else if (message.includes("who are you")) {
        speak("I am your assistant, how can I help you?")
    }
    else if (message.includes("open youtube")) {
        speak("Opening youtube...")
        window.open("https://www.youtube.com", "_blank")
    }
    else if (message.includes("open google")) {
        speak("Opening google...")
        window.open("https://www.google.com", "_blank")
    }
    else if (message.includes("open calculator")) {
        speak("Opening calculator...")
        window.open("calculator://")
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening whatsapp...")
        window.open("whatsapp://")
    }
    // else if (message.includes(`open `)) {
    //     speak("Opening whatsapp...")
    //     window.open("whatsapp://")
    // }
    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined,{hour:"numeric", minute:"numeric"})
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined,{day:"numeric", month:"short"})
        speak(date)
    }
    else {
        let finalText = "here's what i found on web"
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message}`, "_blank")
    }
}