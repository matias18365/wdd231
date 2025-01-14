document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.querySelector('#currentyear');
    const currentYear = new Date();
    yearSpan.innerText = currentYear.getFullYear();

    const lastModifiedSpan = document.querySelector('#lastModified');
    lastModifiedSpan.innerText = document.lastModified;
});

//This is for the menu button.
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});