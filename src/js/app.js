"use strict";

import './chart.js'; // import chart.js
import './map.js'; // import map.js

/**
 * Toggles menu for smaller screens when hamburger icon is clicked
 * Controls the classes "show" and "active" for visibility
 */ 
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

// Button to start animation
const partyBtn = document.querySelector('.party-btn');

/**
 * Handles animation when partyBtn is clicked
 * Controls the class "run-animation" to stop/start
 */
if (partyBtn) {
    partyBtn.addEventListener('click', function () {
        const partyContainerEl = document.querySelector('.guy-img-container')
        const partyGuy = document.querySelectorAll('.party-guy');
        partyContainerEl.classList.toggle('party-started');

        partyGuy.forEach(guy => {
            guy.classList.toggle('run-animation');
        });

    });
}
