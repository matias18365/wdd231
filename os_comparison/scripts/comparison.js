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

        const osCards = document.querySelectorAll('.os-features .os-card');
        osCards.forEach(card => {
            card.addEventListener('click', () => {
                const osName = card.querySelector('h3').innerText;
                let features, additionalInfo;
        
                switch(osName) {
                    case 'Microsoft Windows':
                        features = ['Graphical User Interface', 'Wide Software Compatibility', 'Gaming Support'];
                        additionalInfo = 'Windows is a powerful and versatile operating system developed by Microsoft, widely recognized for its graphical user interface and robust performance. It offers a vast software library, making it a preferred platform for both personal and professional use. With its extensive compatibility, Windows supports a broad range of applications, from productivity tools like Microsoft Office to a rich ecosystem of games. Windows 10 and 11 are distinguished by features such as Cortana, Microsoft Edge, and a user-friendly Start Menu. Security updates and built-in antivirus protection help safeguard user data and privacy. Additionally, Windows supports a diverse array of hardware and peripherals, ensuring smooth functionality across various devices. Whether for gaming, creative work, or business productivity, Microsoft Windows continues to be a leading choice for users around the globe.';
                        break;
                    case 'Apple macOS':
                        features = ['Sleek User Interface', 'Built-in Privacy Features', 'Optimized for Apple Hardware'];
                        additionalInfo = 'macOS is the sophisticated operating system crafted specifically for Apples Mac computers, recognized for its elegant design and intuitive user experience. It provides a user-friendly interface and is tightly integrated with Apple hardware and services, ensuring optimal performance and seamless functionality. With features such as Spotlight for quick searching, Siri for voice-activated assistance, and Continuity that allows users to transition effortlessly between devices, macOS enhances productivity and convenience. The operating system comes equipped with a robust suite of creative and productivity applications, including Photos, Pages, and Final Cut Pro, catering to a variety of user needs. Regular updates bring new tools and improvements, while built-in security measures protect user data and privacy. Whether you are into creative work, programming, or everyday tasks, macOS remains a powerful and reliable choice for users who value efficiency and design.';
                        break;
                    case 'Linux':
                        features = ['Open Source', 'Highly Customizable', 'Strong Security'];
                        additionalInfo = 'Linux is a powerful open-source operating system favored by developers and those who value control over their computing environment. Renowned for its flexibility and customization options, Linux allows users to tailor their systems to fit specific needs, from lightweight distributions for older hardware to robust setups for servers and workstations. Its community-driven nature ensures a wide range of distributions, such as Ubuntu, Fedora, and Debian, each catering to different user preferences. Linux is celebrated for its strong security features, being less prone to malware and offering stability for mission-critical applications. Users benefit from an extensive repository of free software, facilitating development, productivity, and creativity. With powerful command-line tools and scripting capabilities, Linux is the go-to choice for developers and tech enthusiasts who seek a reliable and versatile operating system capable of powering everything from personal computers to supercomputers.';
                        break;
                }
        
                displayOsDetails(osName, features, additionalInfo);
            });
        });
        
        function displayOsDetails(osName, features, additionalInfo) {
            const osInfoDiv = document.getElementById('os-info');
            osInfoDiv.innerHTML = `<strong>${osName}</strong><p>${additionalInfo}</p><h3>Features:</h3><ul>${features.map(feature => `<li>${feature}</li>`).join('')}</ul>`;
        
            const dialog = document.getElementById('os-details');
            dialog.showModal();
        }
});
