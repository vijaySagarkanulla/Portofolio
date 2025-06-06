// Database handling for portfolio website (Part 2)

function loadCertifications() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const certifications = data.certifications;
    
    const container = document.getElementById('certifications-container');
    
    // Clear container
    container.innerHTML = '';
    
    certifications.forEach(cert => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="certification-item" data-id="${cert.id}">
                    <h4>${cert.title}</h4>
                    <p>${cert.issuer}</p>
                    <div class="certification-actions">
                        <button class="btn btn-sm btn-primary" onclick="openEditModal('certifications', '${cert.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('certifications', '${cert.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

function loadExperience() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const experience = data.experience;
    
    const container = document.getElementById('experience-container');
    
    // Clear container
    container.innerHTML = '';
    
    experience.forEach((exp, index) => {
        container.innerHTML += `
            <li>
                <div class="timeline-image">
                    <h4>${index + 1}</h4>
                </div>
                <div class="timeline-panel" data-id="${exp.id}">
                    <div class="timeline-heading">
                        <h4 class="subheading">${exp.position}</h4>
                        <p>${exp.company}</p>
                        <p class="text-muted">${exp.period}</p>
                    </div>
                    <div class="timeline-body">
                        <p>${exp.description}</p>
                    </div>
                    <div class="experience-actions">
                        <button class="btn btn-sm btn-primary" onclick="openEditModal('experience', '${exp.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('experience', '${exp.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </li>
        `;
    });
}

function loadActivities() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const activities = data.activities;
    
    const container = document.getElementById('activities-container');
    
    // Clear container
    container.innerHTML = '';
    
    activities.forEach(activity => {
        container.innerHTML += `
            <div class="col-md-6 mb-4">
                <div class="activity-item" data-id="${activity.id}">
                    <p>${activity.description}</p>
                    <div class="activity-actions">
                        <button class="btn btn-sm btn-primary" onclick="openEditModal('activities', '${activity.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('activities', '${activity.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

function loadWorkshops() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const workshops = data.workshops;
    
    const container = document.getElementById('workshops-container');
    
    // Clear container
    container.innerHTML = '';
    
    workshops.forEach(workshop => {
        container.innerHTML += `
            <div class="col-md-6 mb-4">
                <div class="workshop-item" data-id="${workshop.id}">
                    <p>${workshop.description}</p>
                    <div class="workshop-actions">
                        <button class="btn btn-sm btn-primary" onclick="openEditModal('workshops', '${workshop.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('workshops', '${workshop.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

// CRUD Operations for each section

// About section
function updateAbout(content) {
    console.log("About section updated with:", content);
    // No need to update localStorage for the about section as it's static
}

// Skills section
function addSkill(name, level) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const newSkill = {
        id: 'skill' + generateId(),
        name: name,
        level: parseInt(level)
    };
    
    data.skills.push(newSkill);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    
    // Reload skills
    loadSkills();
}

function updateSkill(id, name, level) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const skillIndex = data.skills.findIndex(skill => skill.id === id);
    
    if (skillIndex !== -1) {
        data.skills[skillIndex].name = name;
        data.skills[skillIndex].level = parseInt(level);
        localStorage.setItem('portfolioData', JSON.stringify(data));
        
        // Reload skills
        loadSkills();
    }
}

// Education section
function addEducation(institution, degree, year, grade) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const newEducation = {
        id: 'edu' + generateId(),
        institution: institution,
        degree: degree,
        year: year,
        grade: grade
    };
    
    data.education.push(newEducation);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    
    // Reload education
    loadEducation();
}

function updateEducation(id, institution, degree, year, grade) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const eduIndex = data.education.findIndex(edu => edu.id === id);
    
    if (eduIndex !== -1) {
        data.education[eduIndex].institution = institution;
        data.education[eduIndex].degree = degree;
        data.education[eduIndex].year = year;
        data.education[eduIndex].grade = grade;
        localStorage.setItem('portfolioData', JSON.stringify(data));
        
        // Reload education
        loadEducation();
    }
}

// Projects section
function addProject(title, description) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const newProject = {
        id: 'proj' + generateId(),
        title: title,
        description: description
    };
    
    data.projects.push(newProject);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    
    // Reload projects
    loadProjects();
}

function updateProject(id, title, description) {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    const projIndex = data.projects.findIndex(project => project.id === id);
    
    if (projIndex !== -1) {
        data.projects[projIndex].title = title;
        data.projects[projIndex].description = description;
        localStorage.setItem('portfolioData', JSON.stringify(data));
        
        // Reload projects
        loadProjects();
    }
}

// Delete item from any section
function deleteItem(section, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        const data = JSON.parse(localStorage.getItem('portfolioData'));
        
        // Find and remove the item from the appropriate section
        const index = data[section].findIndex(item => item.id === id);
        
        if (index !== -1) {
            data[section].splice(index, 1);
            localStorage.setItem('portfolioData', JSON.stringify(data));
            
            // Reload the appropriate section
            switch (section) {
                case 'skills':
                    loadSkills();
                    break;
                case 'education':
                    loadEducation();
                    break;
                case 'projects':
                    loadProjects();
                    break;
                case 'certifications':
                    loadCertifications();
                    break;
                case 'experience':
                    loadExperience();
                    break;
                case 'activities':
                    loadActivities();
                    break;
                case 'workshops':
                    loadWorkshops();
                    break;
            }
        }
    }
}
