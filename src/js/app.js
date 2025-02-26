"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.navbar');
    const menuItems = document.querySelector('.navbar-items');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    hamburgerIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
        menuItems.classList.toggle('show');
        hamburgerIcon.classList.toggle('active');
    });
});

const partyBtn = document.querySelector('.party-btn');

partyBtn.addEventListener('click', function() {
    const partyContainerEl = document.querySelector('.guy-img-container')
    const partyGuy = document.querySelectorAll('.party-guy');
    partyContainerEl.classList.toggle('party-started');
    
    partyGuy.forEach(guy => {
        guy.classList.toggle('run-animation');
    });
    
});