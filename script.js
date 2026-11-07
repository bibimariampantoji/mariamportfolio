// =====================================
// LOAD JSON DATA USING FETCH API
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load data.json");
            }

            return response.json();

        })

        .then(data => {

            console.log("Portfolio data loaded successfully!");

            // Render all portfolio sections
            loadPortfolio(data);

            // Hide loading screen
            document.getElementById("loading").style.display = "none";

            // Show portfolio
            document.getElementById("portfolio-content").style.display = "block";

        })

        .catch(error => {

            console.error("Error:", error);

            document.getElementById("loading").style.display = "none";

            document.getElementById("error-message").style.display = "block";

        });

});


// =====================================
// MAIN PORTFOLIO FUNCTION
// =====================================

function loadPortfolio(data) {

    loadNavbar(data);
    loadHero(data);
    loadAbout(data);
    loadSkills(data);
    loadProjects(data);
    loadEducation(data);
    loadCertifications(data);
    loadContact(data);
    loadFooter(data);

}


// =====================================
// NAVBAR
// =====================================

function loadNavbar(data) {

    document.getElementById("nav-logo").textContent =
        data.personal.name;

}


// =====================================
// HERO SECTION
// =====================================

function loadHero(data) {

    const personal = data.personal;

    document.getElementById("hero-greeting").textContent =
        personal.greeting;

    document.getElementById("student-name").textContent =
        personal.name;

    document.getElementById("student-role").textContent =
        personal.role;

    document.getElementById("student-intro").textContent =
        personal.introduction;

    document.getElementById("career-goal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profile-image").src =
        personal.profileImage;

    document.getElementById("profile-image").alt =
        personal.name;

    document.getElementById("resume-link").href =
        personal.resume;

    // Social Media Icons

    let socialHTML = "";

    data.socialMedia.forEach(social => {

        socialHTML += `
            <a href="${escapeHTML(social.url)}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${escapeHTML(social.name)}">

                <i class="${escapeHTML(social.icon)}"></i>

            </a>
        `;

    });

    document.getElementById("hero-social").innerHTML =
        socialHTML;

}


// =====================================
// ABOUT SECTION
// =====================================

function loadAbout(data) {

    document.getElementById("about-image").src =
        data.personal.profileImage;

    document.getElementById("about-title").textContent =
        data.about.title;

    document.getElementById("about-description").textContent =
        data.about.description;

    let detailsHTML = `
        <div class="about-detail">
            <strong>Email</strong>
            ${escapeHTML(data.personal.email)}
        </div>

        <div class="about-detail">
            <strong>Phone</strong>
            ${escapeHTML(data.personal.phone)}
        </div>
    `;

    document.getElementById("about-details").innerHTML =
        detailsHTML;

}


// =====================================
// SKILLS SECTION
// =====================================

function loadSkills(data) {

    const container =
        document.getElementById("skills-container");

    let html = "";

    data.skills.forEach(skill => {

        html += `

            <div class="col-sm-6 col-lg-4">

                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="${escapeHTML(skill.icon)}"></i>
                    </div>

                    <h4>${escapeHTML(skill.name)}</h4>

                    <p>${escapeHTML(skill.level)}</p>

                    <div class="progress">

                        <div class="progress-bar"
                            role="progressbar"
                            style="width: ${Number(skill.percentage)}%"
                            aria-valuenow="${Number(skill.percentage)}"
                            aria-valuemin="0"
                            aria-valuemax="100">

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

    container.innerHTML = html;

}


// =====================================
// PROJECTS SECTION
// =====================================

function loadProjects(data) {

    const container =
        document.getElementById("projects-container");

    let html = "";

    data.projects.forEach(project => {

        let technologies = "";

        project.technologies.forEach(tech => {

            technologies += `
                <span>${escapeHTML(tech)}</span>
            `;

        });

        html += `

            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img src="${escapeHTML(project.image)}"
                        class="project-image"
                        alt="${escapeHTML(project.name)}">

                    <div class="project-content">

                        <h4>${escapeHTML(project.name)}</h4>

                        <p>
                            ${escapeHTML(project.description)}
                        </p>

                        <div class="tech-tags">
                            ${technologies}
                        </div>

                        <a href="${escapeHTML(project.link)}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-link">

                            View Project
                            <i class="bi bi-arrow-up-right"></i>

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

    container.innerHTML = html;

}


// =====================================
// EDUCATION SECTION
// =====================================

function loadEducation(data) {

    const container =
        document.getElementById("education-container");

    let html = "";

    data.education.forEach(edu => {

        html += `

            <div class="education-card">

                <h4>${escapeHTML(edu.course)}</h4>

                <h5>${escapeHTML(edu.college)}</h5>

                <p>
                    <i class="bi bi-calendar"></i>
                    ${escapeHTML(edu.duration)}
                </p>

                <p>
                    <strong>Semester:</strong>
                    ${escapeHTML(edu.semester)}
                </p>

                <p>
                    <strong>Academic Details:</strong>
                    ${escapeHTML(edu.details)}
                </p>

            </div>

        `;

    });

    container.innerHTML = html;

}


// =====================================
// CERTIFICATIONS SECTION
// =====================================

function loadCertifications(data) {

    const container =
        document.getElementById("certifications-container");

    let html = "";

    data.certifications.forEach(certificate => {

        html += `

            <div class="col-md-6 col-lg-4">

                <div class="certificate-card">

                    <div class="certificate-icon">

                        <i class="bi bi-award"></i>

                    </div>

                    <h4>${escapeHTML(certificate.name)}</h4>

                    <p>
                        ${escapeHTML(certificate.organization)}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${escapeHTML(certificate.date)}
                    </p>

                    <p>
                        ${escapeHTML(certificate.description)}
                    </p>

                </div>

            </div>

        `;

    });

    document.getElementById("certifications-container").innerHTML =
        html;

}


// =====================================
// CONTACT SECTION
// =====================================

function loadContact(data) {

    const personal = data.personal;

    const container =
        document.getElementById("contact-details");

    container.innerHTML = `

        <div class="contact-item">

            <i class="bi bi-envelope"></i>

            <div>
                <strong>Email</strong>
                <br>
                <a href="mailto:${escapeHTML(personal.email)}">
                    ${escapeHTML(personal.email)}
                </a>
            </div>

        </div>

        <div class="contact-item">

            <i class="bi bi-telephone"></i>

            <div>
                <strong>Phone</strong>
                <br>
                <a href="tel:${escapeHTML(personal.phone)}">
                    ${escapeHTML(personal.phone)}
                </a>
            </div>

        </div>

        <div class="contact-item">

            <i class="bi bi-geo-alt"></i>

            <div>
                <strong>Location</strong>
                <br>
                ${escapeHTML(personal.location)}
            </div>

        </div>

    `;

}


// =====================================
// FOOTER SECTION
// =====================================

function loadFooter(data) {

    document.getElementById("footer-name").textContent =
        data.personal.name;

    document.getElementById("footer-description").textContent =
        data.personal.footerDescription;

    document.getElementById("copyright").textContent =
        "© " + new Date().getFullYear() +
        " " + data.personal.name +
        ". All Rights Reserved.";

    let socialHTML = "";

    data.socialMedia.forEach(social => {

        socialHTML += `

            <a href="${escapeHTML(social.url)}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${escapeHTML(social.name)}">

                <i class="${escapeHTML(social.icon)}"></i>

            </a>

        `;

    });

    document.getElementById("footer-social").innerHTML =
        socialHTML;

}


// =====================================
// BASIC HTML ESCAPING
// =====================================

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function (char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

document.getElementById("contact-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values

        const name =
            document.getElementById("contact-name").value.trim();

        const email =
            document.getElementById("contact-email").value.trim();

        const subject =
            document.getElementById("contact-subject").value.trim();

        const message =
            document.getElementById("contact-message").value.trim();


        // Clear previous errors

        document.querySelectorAll(".error-text").forEach(error => {
            error.textContent = "";
        });

        document.getElementById("form-success").textContent = "";

        let isValid = true;


        // Name validation

        if (name.length < 2) {

            document.getElementById("name-error").textContent =
                "Please enter a valid name.";

            isValid = false;

        }


        // Email validation

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            document.getElementById("email-error").textContent =
                "Please enter a valid email address.";

            isValid = false;

        }


        // Subject validation

        if (subject.length < 3) {

            document.getElementById("subject-error").textContent =
                "Subject must contain at least 3 characters.";

            isValid = false;

        }


        // Message validation

        if (message.length < 10) {

            document.getElementById("message-error").textContent =
                "Message must contain at least 10 characters.";

            isValid = false;

        }


        // Successful validation

        if (isValid) {

            document.getElementById("form-success").textContent =
                "Your form has been validated successfully! " +
                "Please note that no message has been sent because " +
                "a backend or email service is not connected.";

            // Reset form

            document.getElementById("contact-form").reset();

        }

    });