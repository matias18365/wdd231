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

    const url = 'https://matias18365.github.io/wdd231/chamber/data/members.json'; // URL to JSON

    // Function to fetch member data
    async function fetchMembers() {
        try {
            const response = await fetch(url);
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

    gridButton.addEventListener("click", () => toggleView('grid'));
    listButton.addEventListener("click", () => toggleView('list'));
    
    // Function to toggle views
    function toggleView(view) {
        if (view === 'grid') {
            memberList.classList.add("grid");
            memberList.classList.remove("list");
        } else if (view === 'list') {
            memberList.classList.add("list");
            memberList.classList.remove("grid");
        }
    }
});