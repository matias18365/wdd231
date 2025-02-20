document.addEventListener("DOMContentLoaded", function() {
    // Display current year and last modified date
    const yearSpan = document.querySelector('#currentyear');
    const currentYear = new Date();
    yearSpan.innerText = currentYear.getFullYear();

    const lastModifiedSpan = document.querySelector('#lastModified');
    lastModifiedSpan.innerText = document.lastModified;

    // Menu button functionality
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    const osList = document.getElementById("os-list");
    const osUrl = 'https://matias18365.github.io/wdd231/os_comparison/data/comparison.json'; // URL to JSON

    // Function to fetch member data
    async function fetchOs() {
        try {
            const response = await fetch(osUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayOs(data.os);
        } catch (error) {
            console.error('Error fetching os data:', error);
        }
    }
    fetchOs();

    // Function to display os's on the page
    function displayOs(os) {

        console.log(os)
        os.forEach(osy => {
            const osCard = document.createElement('div');
            osCard.className = 'os-card';
            osCard.innerHTML = `
                <img src="${osy.image}" alt="${osy.name} Logo" />
                <h3>${osy.name}</h3>
                <p><a href="${osy.website}" target="_blank">Visit Website</a></p>
                <p>${osy.description}</p>
            `;
            osList.appendChild(osCard);
        });
    }
});
