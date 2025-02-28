"use strict";

/** 
* Location search form above map.
* Allows user input.
*/
const searchForm = document.getElementById("search-form");

/**
 * Handles form submission for the map search bar.
 *
 * @param {Event} event - Submit event from the map search bar.
 */
function searchFormSubmit(event) {
    event.preventDefault();

    // Get and trim user input from search form
    const userInput = event.target.querySelector("input").value.trim();
    
    // Field for user feedback
    const emptyFieldMsg = document.querySelector(".empty-field");
    // Container to display location info
    const locationInfo = document.getElementById("location-info");
    // Map
    const mapFrame = document.getElementById("map-frame");

    if (!userInput) {
        emptyFieldMsg.textContent = "Vänligen ange en plats";
        emptyFieldMsg.classList.add("show");

        setTimeout(() => emptyFieldMsg.classList.remove("show"), 2000);
        return;
    }

    // Encoded search bar user input
    const encodedInput = encodeURIComponent(userInput);
    
    // API URL requesting JSON response for encoded user input
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedInput}`;

    fetchLocationData(url, userInput, locationInfo, mapFrame);
}

/**
 * Fetches location data from the Nominatim API.
 *
 * @param {string} url - The API URL with the encoded search query.
 * @param {string} userInput - The user's original search input.
 * @param {HTMLElement} locationInfo - Element where location details are displayed.
 * @param {HTMLElement} mapFrame - iframe element displaying the map.
 */
async function fetchLocationData(url, userInput, locationInfo, mapFrame) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.length === 0) {
            alert(`Inga resultat för "${userInput}". Vänligen testa igen.`);
            return;
        }

        // Extract necessary data from API response
        const { lat, lon, display_name } = data[0];

        // Display location data on the page
        locationInfo.innerHTML = `
            <i>Plats: ${display_name}</i> <br>
            <i>Lat: ${lat}</i> <br>
            <i>Lon: ${lon}</i>`;

        // Update map frame to show location
        mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;

    } catch (error) {
        console.error("Error när plats skulle hämtas:", error);
        alert("Något gick fel. Vänligen testa igen.");
    }
}

// Add event listener only when searchForm exists
if (searchForm) {
    searchForm.addEventListener("submit", searchFormSubmit);
}