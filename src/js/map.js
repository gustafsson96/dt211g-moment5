"use strict";

/**
 * Handles form submission for the map search bar.
 * Fetches location data from the Nominatim API from user input.
 * 
 * @param {Event} The submit event from map search bar
 */
document.getElementById("search-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInput = event.target.querySelector('input').value.trim();

    const emptyFieldMsg = document.querySelector('.empty-field');

    if (!userInput) {
        emptyFieldMsg.textContent = "Vänligen ange en plats";
        emptyFieldMsg.classList.add('show');

        setTimeout(() => {
            emptyFieldMsg.classList.remove('show'); 
        }, 2000);

        return;
    }

    const encodedInput = encodeURIComponent(userInput);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            alert(`Inga resultat för ${userInput}. Vänligen testa igen.`);
            return;
        }

        console.log("Sökresultat:", data);

        const { lat, lon, display_name } = data[0];
        const locationInfo = document.getElementById("location-info");
        locationInfo.innerHTML = `<i>Plats: ${display_name}</i> <br>
                                  <i>Lat: ${lat}</i> <br>
                                  <i>Lon: ${lon}</i>`;

        // update src attribute to move marker
        const mapFrame = document.getElementById("map-frame");
        mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;

    } catch (error) {
        console.error("Error när plats skulle hämtas: ", error);
        alert("Något gick fel. Vänligen testa igen.");
    }
});