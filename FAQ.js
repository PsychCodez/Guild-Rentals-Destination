var currentAnswer = null;

function toggleAnswer(id) {
    var answer = document.getElementById("answer" + id);

    if (currentAnswer && currentAnswer !== answer) {
        currentAnswer.style.display = "none";
    }

    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }

    currentAnswer = answer;
}
document.addEventListener('DOMContentLoaded', function () {
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login p');
const registerLink = document.querySelector('.register a');
const loginButton = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', (e) => {
e.preventDefault();
wrapper.classList.remove('active');
});

loginLink.addEventListener('click', (e) => {
e.preventDefault();
wrapper.classList.add('active');
});

loginButton.addEventListener('click', () => {
wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
wrapper.classList.remove('active-popup');
});
});

function closeFAQ() {
        var box = document.querySelector(".box");
        var wrapper = document.getElementById("wrapper");
            
        if (box && wrapper) {
            box.style.display = "none"; 
        }
 };
