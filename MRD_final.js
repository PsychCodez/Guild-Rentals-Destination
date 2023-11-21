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
    var box = document.querySelector(".About");
    var wrapper = document.getElementById("wrapper");
        
    if (box && wrapper) {
        box.style.display = "none"; 
    }
};

// document.addEventListener('DOMContentLoaded', function () {
//     const wrapper = document.querySelector('.wrapper');
//     const loginLink = document.querySelector('.login a'); // Select the anchor element within the .login div
//     const registerLink = document.querySelector('.register a'); // Select the anchor element within the .register div
//     const loginButton = document.querySelector('.btnLogin-popup');
//     const iconClose = document.querySelector('.icon-close');

//     registerLink.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent the default link behavior (navigating to another page)
//         wrapper.classList.remove('active');
//     });

//     loginLink.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent the default link behavior (navigating to another page)
//         wrapper.classList.add('active');
//     });

//     loginButton.addEventListener('click', () => {
//         wrapper.classList.add('active-popup');
//     });

//     iconClose.addEventListener('click', () => {
//         wrapper.classList.remove('active-popup');
//     });
// });
