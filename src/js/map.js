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
    if (!userInput) return;

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
        alert(`Plats hittad: ${display_name} (Lat: ${lat}, Lon: ${lon})`);

    } catch (error) {
        console.error("Error när plats skulle hämtas: ", error);
        alert("Något gick fel. Vänligen testa igen.");
    }
});