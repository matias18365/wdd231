document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.querySelector('#currentyear');
    const currentYear = new Date();
    yearSpan.innerText = currentYear.getFullYear();

    const lastModifiedSpan = document.querySelector('#lastModified');
    lastModifiedSpan.innerText = document.lastModified;

    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");
    const memberList = document.getElementById("course-list");
    const totalMembers = document.getElementById("total-credits");

    if (gridButton && listButton) {
        gridButton.addEventListener("click", () => {
            toggleView('grid');
        });

        listButton.addEventListener("click", () => {
            toggleView('list');
        });
    }

    function toggleView(view) {
        if (view === 'grid') {
            memberList.classList.add("grid");
            memberList.classList.remove("list");
        } else if (view === 'list') {
            memberList.classList.add("list");
            memberList.classList.remove("grid");
        }
    }

    async function fetchMembers() {
        try {
            const response = await fetch('../data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    function displayMembers(members) {
        memberList.innerHTML = '';
        totalMembers.innerText = `Total Members: ${members.length}`;

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

    fetchMembers();
});