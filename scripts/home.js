document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.querySelector('#currentyear');
    const currentYear = new Date();
    yearSpan.innerText = currentYear.getFullYear();

    const lastModifiedSpan = document.querySelector('#lastModified');
    lastModifiedSpan.innerText = document.lastModified;
});

//This is for the menu button.
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

//Courses Completed List
document.addEventListener("DOMContentLoaded", function() {
    const courses = [
        { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: true },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: true },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
        { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', completed: false }
    ];
    
    const courseList = document.getElementById('course-list');
    const totalCredits = document.getElementById('total-credits');

    function renderCourses(filteredCourses) {
        courseList.innerHTML = '';
        const total = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
        totalCredits.innerText = `Total Credits: ${total}`;

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card' + (course.completed ? ' completed' : '');
            courseCard.innerHTML = `
                <h3>${course.title} (${course.subject} ${course.number})</h3>
                <p>Credits: ${course.credits}</p>
                <p>${course.completed ? "Completed" : "Not Completed"}</p>
            `;
            courseList.appendChild(courseCard);
        });
    }


    renderCourses(courses);

    document.getElementById('show-all').addEventListener('click', () => renderCourses(courses));
    document.getElementById('show-wdd').addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        renderCourses(wddCourses);
    });
    
    document.getElementById('show-cse').addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        renderCourses(cseCourses);
    });
});
