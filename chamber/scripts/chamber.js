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

    // Buttons for toggling views
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");
    const memberList = document.getElementById("course-list");
    const totalMembers = document.getElementById("total-credits");

    const membersUrl = 'https://matias18365.github.io/wdd231/chamber/data/members.json'; // URL to JSON

    // Function to fetch member data
    async function fetchMembers() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }
    fetchMembers();

    // Function to display members on the page
    function displayMembers(members) {
        memberList.innerHTML = '';
        //totalMembers.innerText = `Total Members: ${members.length}`;

        console.log(members)
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'course-card';
            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
                <p>${member.description}</p>
            `;
            memberList.appendChild(memberCard);
        });
    }

    // gridButton.addEventListener("click", () => toggleView('grid'));
    // listButton.addEventListener("click", () => toggleView('list'));
    


    // select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast-container');

// Constants for latitude, longitude, and API key
const lat = -17.79;
const lon = -63.18;
const apiKey = '4f8c8e86f0ed85c6b75cb3375f7e9d44';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

// Fetch current weather data
async function apiFetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display current weather results
function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
}

// Fetch 5-day weather forecast data
async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';

    const forecastDays = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

    forecastDays.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        card.innerHTML = `
            <h3>${formattedDate}</h3>
            <p>Temp: ${day.main.temp}&deg;C</p>
            <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <p>${day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}</p>
        `;
        forecastContainer.appendChild(card);
    });
}

apiFetchCurrentWeather();
apiFetchForecast();

async function fetchGoldMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayGoldMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayGoldMembers(members) {
    const goldMembers = members.filter(member => member.membershipLevel === 3);
    const spotlightContainer = document.querySelector(".spotlight-member");
    spotlightContainer.innerHTML = '';

    // Limit to 3 Gold members for spotlight display, if available
    const membersToDisplay = goldMembers.slice(0, 3);

    // Create cards for each Gold member
    membersToDisplay.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'spotlight-card';
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: Gold</p> <!-- Directly state Gold -->
            <p>${member.description}</p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}


fetchGoldMembers();



    // Functions related to membership levels
    function displayMembershipDetails(level, benefits, cost) {
        const membershipModal = document.getElementById('membership-details');
        const membershipInfo = document.getElementById('membership-info');

        membershipInfo.innerHTML = `
            <p><strong>Membership Level:</strong> ${level}</p>
            <p><strong>Benefits:</strong> ${benefits.join(', ')}</p>
            <p><strong>Cost:</strong> $${cost}</p>
        `;

        membershipModal.showModal();

        const closeButton = document.getElementById('closeMembershipModal');
        closeButton.addEventListener('click', () => {
            membershipModal.close();
        });
    }

    const membershipCards = document.querySelectorAll('.membership-levels .card');
    membershipCards.forEach(card => {
        card.addEventListener('click', () => {
            const level = card.querySelector('h3').innerText;
            let benefits, cost;

            switch(level) {
                case 'Non Profit Membership':
                    benefits = ['Basic Access'];
                    cost = 0;
                    break;
                case 'Bronze Membership':
                    benefits = ['Basic Access', '5% Discount'];
                    cost = 50;
                    break;
                case 'Silver Membership':
                    benefits = ['Basic Access', '10% Discount', 'Free Event'];
                    cost = 100;
                    break;
                case 'Gold Membership':
                    benefits = ['All Benefits', '20% Discount'];
                    cost = 200;
                    break;
            }

            displayMembershipDetails(level, benefits, cost);
        });
    });

    // Function to check if on the thank you page and populate the data
    function checkThankYouPage() {
        if (window.location.pathname.includes("thankyou.html")) {
            const urlParams = new URLSearchParams(window.location.search);

            document.getElementById('first-name').textContent = urlParams.get('first_name') || "N/A";
            document.getElementById('last-name').textContent = urlParams.get('last_name') || "N/A";
            document.getElementById('org-title').textContent = urlParams.get('org_title') || "N/A";
            document.getElementById('email').textContent = urlParams.get('email') || "N/A";
            document.getElementById('phone').textContent = urlParams.get('phone') || "N/A";
            document.getElementById('business-name').textContent = urlParams.get('business_name') || "N/A";
            document.getElementById('description').textContent = urlParams.get('description') || "N/A";
            document.getElementById('membership-level').textContent = urlParams.get('membership_level') || "N/A";
            document.getElementById('timestamp').textContent = urlParams.get('timestamp') || "No timestamp available";
        }
    }

    checkThankYouPage();
});