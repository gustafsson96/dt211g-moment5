"use strict";

import './chart.js'; // import chart.js
import './map.js'; // import map.js

/**
 * Toggles menu for smaller screens when hamburger icon is clicked.
 * Controls the classes "show" and "active" for visibility.
 */ 
function toggleMenu() {
    const menu = document.querySelector('.navbar');
    const menuItems = document.querySelector('.navbar-items');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    if (!menu || !menuItems || !hamburgerIcon) return;

    hamburgerIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
        menuItems.classList.toggle('show');
        hamburgerIcon.classList.toggle('active');
    });
};

// Run function after DOM is loaded
document.addEventListener('DOMContentLoaded', toggleMenu);

// Button to start animation
const partyBtn = document.querySelector('.party-btn');

/**
 * Handles animation when partyBtn is clicked.
 * Controls the class "run-animation" to stop/start.
 */
function partyAnimation() {
    const partyContainerEl = document.querySelector('.guy-img-container');
    const partyGuy = document.querySelectorAll('.party-guy');

    if (!partyContainerEl || partyGuy.length === 0) return;

    partyContainerEl.classList.toggle('party-started');

    partyGuy.forEach(guy => {
        guy.classList.toggle('run-animation');
    });
}
if (partyBtn) {
    partyBtn.addEventListener('click', partyAnimation);
};
