// --- THEME STATE ---
let currentTheme = 'classic';

// --- RENDER FUNCTIONS ---

// Populate inputs initially
function initEditor() {
    document.getElementById('input-name').value = cvData.name;
    document.getElementById('input-initials').value = cvData.initials || "IF";
    document.getElementById('input-subtitle').value = cvData.subtitle || "Computer Engineering Graduate";
    document.getElementById('input-contact').value = cvData.contact;
    document.getElementById('input-summary').value = cvData.summary;

    renderEditorLists();
    
    // Check if theme was previously selected internally, if not show modal
    const modal = document.getElementById('welcome-modal');
    if (modal && modal.style.display !== 'none') {
        modal.style.display = 'flex';
    } else {
        renderPreview();
    }
}

function clearDummyData() {
    cvData.name = "";
    cvData.initials = "";
    cvData.subtitle = "";
    cvData.contact = "";
    cvData.summary = "";
    cvData.strengths = [];
    cvData.education = [];
    cvData.experience = [];
    cvData.skills = [];
    cvData.certifications = [];

    // Clear inputs
    document.getElementById('input-name').value = "";
    document.getElementById('input-initials').value = "";
    document.getElementById('input-subtitle').value = "";
    document.getElementById('input-contact').value = "";
    document.getElementById('input-summary').value = "";

    renderEditorLists();
}

function selectTheme(theme) {
    document.getElementById('welcome-modal').style.display = 'none';
    document.getElementById('theme-selector').value = theme;
    
    // Clear dummy data when starting fresh
    clearDummyData();

    changeThemeFromDropdown(theme);
}

function changeThemeFromDropdown(theme) {
    currentTheme = theme;
    const previewContainer = document.getElementById('cv-preview');
    previewContainer.className = `theme-${theme}`; // sets theme-classic or theme-modern
    renderPreview();
}

function renderEditorLists() {
    // Education
    const edContainer = document.getElementById('education-editor-container');
    edContainer.innerHTML = cvData.education.map((ed, idx) => `
        <div class="item-container">
            <button class="remove-btn" onclick="removeEducation(${idx})">X</button>
            <input type="text" class="form-group" value="${ed.degree}" oninput="updateEducation(${idx}, 'degree', this.value)" placeholder="Degree/Title">
            <input type="text" class="form-group" value="${ed.dates}" oninput="updateEducation(${idx}, 'dates', this.value)" placeholder="Dates (e.g. 2019 - 2023)">
            <input type="text" style="margin-bottom:0;" value="${ed.institution}" oninput="updateEducation(${idx}, 'institution', this.value)" placeholder="Institution">
        </div>
    `).join('');

    // Experience
    const expContainer = document.getElementById('experience-editor-container');
    expContainer.innerHTML = cvData.experience.map((exp, idx) => `
        <div class="item-container">
            <button class="remove-btn" onclick="removeExperience(${idx})">X</button>
            <input type="text" class="form-group" value="${exp.title}" oninput="updateExperience(${idx}, 'title', this.value)" placeholder="Job Title">
            <input type="text" class="form-group" value="${exp.dates}" oninput="updateExperience(${idx}, 'dates', this.value)" placeholder="Dates (e.g. Jan 2026 - Present)">
            <textarea style="margin-bottom:0;" placeholder="Detail di sini (Gunakan *teks* untuk menebalkan kolom tertentu jika perlu, satu garis = satu poin bullet)" oninput="updateExperienceBullets(${idx}, this.value)">${exp.bullets.join('\n')}</textarea>
        </div>
    `).join('');

    // Strengths
    const strengthContainer = document.getElementById('strengths-editor-container');
    if (strengthContainer && cvData.strengths) {
        strengthContainer.innerHTML = cvData.strengths.map((str, idx) => `
            <div class="item-container">
                <button class="remove-btn" onclick="removeStrength(${idx})">X</button>
                <input type="text" class="form-group" value="${str.name}" oninput="updateStrength(${idx}, 'name', this.value)" placeholder="Strength Name (e.g. Leadership)">
                <textarea style="margin-bottom:0;" placeholder="Short description" oninput="updateStrength(${idx}, 'description', this.value)">${str.description}</textarea>
            </div>
        `).join('');
    }

    // Skills
    const skillContainer = document.getElementById('skills-editor-container');
    skillContainer.innerHTML = cvData.skills.map((sk, idx) => `
        <div class="item-container">
            <button class="remove-btn" onclick="removeSkill(${idx})">X</button>
            <input type="text" class="form-group" value="${sk.category}" oninput="updateSkill(${idx}, 'category', this.value)" placeholder="Category (e.g. Technical)">
            <textarea style="margin-bottom:0;" placeholder="Comma separated details" oninput="updateSkill(${idx}, 'details', this.value)">${sk.details}</textarea>
        </div>
    `).join('');

    // Certifications
    const certContainer = document.getElementById('certs-editor-container');
    certContainer.innerHTML = cvData.certifications.map((cert, idx) => `
        <div class="item-container" style="display:flex; gap:10px;">
            <button class="remove-btn" style="position:static;" onclick="removeCert(${idx})">X</button>
            <input type="text" style="flex:1; margin-bottom:0;" value="${cert.replace(/"/g, '&quot;')}" oninput="updateCert(${idx}, this.value)">
        </div>
    `).join('');
}

// Preview rendering logic
function parseText(text) {
    if (!text) return "";
    // Replace **text** or *text* with <strong>text</strong>
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    return parsed;
}

function parseMultiline(text) {
    if (!text) return "";
    return text.split('\n')
        .filter(p => p.trim() !== '')
        .map(p => `<p>${parseText(p)}</p>`)
        .join('');
}

function renderPreview() {
    if (currentTheme === 'modern') {
        renderModernPreview();
    } else {
        renderClassicPreview();
    }
}

function renderClassicPreview() {
    const preview = document.getElementById('cv-preview');

    let html = `
        <h1>${cvData.name}</h1>
        <div class="contact-info">${cvData.contact}</div>
        
        <h2>PROFESSIONAL SUMMARY</h2>
        ${parseMultiline(cvData.summary)}
        
        <h2>EDUCATION</h2>
    `;

    cvData.education.forEach(ed => {
        html += `
        <div class="job-header">
            <span class="job-title">${parseText(ed.degree)}</span>
            <span class="job-dates">${ed.dates}</span>
            <br/>
            <span>${parseText(ed.institution)}</span>
        </div>`;
    });

    html += `<h2>WORK EXPERIENCE</h2>`;
    cvData.experience.forEach(exp => {
        html += `
        <div class="job-header">
            <span class="job-title">${parseText(exp.title)}</span>
            <span class="job-dates">${exp.dates}</span>
        </div>
        <ul>
            ${exp.bullets.map(b => `<li>${parseText(b)}</li>`).join('')}
        </ul>`;
    });

    html += `<h2>SKILLS</h2><div class="skills-list">`;
    cvData.skills.forEach(sk => {
        html += `<p><strong>${sk.category}:</strong> ${parseText(sk.details)}</p>`;
    });
    html += `</div>`;

    html += `<h2>CERTIFICATIONS</h2><ul>`;
    cvData.certifications.forEach(cert => {
        html += `<li>${parseText(cert)}</li>`;
    });
    html += `</ul>`;

    preview.innerHTML = html;
}

function renderModernPreview() {
    const preview = document.getElementById('cv-preview');

    // Parse contact info (assuming format: Location | Email | Phone etc)
    const contacts = cvData.contact.split('|').map(c => c.trim()).filter(c => c);
    const contactHtml = contacts.map(c => `<span class="contact-item">${c}</span>`).join(' &bull; ');

    let html = `
        <div class="modern-header">
            <div class="header-text">
                <h1>${cvData.name}</h1>
                <div class="subtitle">${cvData.subtitle || ''}</div>
                <div class="contact-info-modern">${contactHtml}</div>
            </div>
            <div class="header-avatar">
                <div class="avatar-circle">${cvData.initials || 'IF'}</div>
            </div>
        </div>

        <div class="modern-body">
            <!-- Left Column -->
            <div class="modern-left">
                <div class="modern-section">
                    <h2>SUMMARY</h2>
                    <div class="summary-text">${parseMultiline(cvData.summary)}</div>
                </div>

                <div class="modern-section">
                    <h2>EXPERIENCE</h2>
    `;

    cvData.experience.forEach(exp => {
        html += `
                    <div class="modern-job">
                        <div class="job-header">
                            <span class="job-title">${parseText(exp.title)}</span>
                        </div>
                        <div class="job-dates">${exp.dates}</div>
                        <div class="job-desc">
                            <ul>
                                ${exp.bullets.map(b => `<li>${parseText(b)}</li>`).join('')}
                            </ul>
                        </div>
                    </div>`;
    });

    html += `
                </div>
            </div>

            <!-- Right Column -->
            <div class="modern-right">
                <div class="modern-section">
                    <h2>EDUCATION</h2>
    `;

    cvData.education.forEach(ed => {
        html += `
                    <div class="modern-ed">
                        <div class="ed-degree">${parseText(ed.degree)}</div>
                        <div class="ed-school">${parseText(ed.institution)}</div>
                        <div class="ed-dates">${ed.dates}</div>
                    </div>`;
    });

    html += `
                </div>

                <div class="modern-section">
                    <h2>STRENGTHS</h2>
                    <div class="strengths-list">
    `;

    if (cvData.strengths) {
        cvData.strengths.forEach(str => {
            html += `
                        <div class="strength-item">
                            <div class="strength-icon"></div>
                            <div class="strength-content">
                                <strong>${str.name}</strong>
                                <p>${str.description}</p>
                            </div>
                        </div>`;
        });
    }

    html += `
                    </div>
                </div>

                <div class="modern-section">
                    <h2>SKILLS</h2>
                    <div class="modern-skills">
    `;

    // Flatten skills for badges
    let allSkills = [];
    cvData.skills.forEach(sk => {
        const parts = sk.details.split(',').map(s => s.trim()).filter(s => s);
        allSkills = allSkills.concat(parts);
    });

    allSkills.forEach(s => {
        html += `<span class="skill-badge">${s}</span>`;
    });

    html += `
                    </div>
                </div>
            </div>
        </div>
    `;

    preview.innerHTML = html;
}

// --- UPDATE HANDLERS ---
function updateCV() {
    cvData.name = document.getElementById('input-name').value;
    cvData.initials = document.getElementById('input-initials').value;
    cvData.subtitle = document.getElementById('input-subtitle').value;
    cvData.contact = document.getElementById('input-contact').value;
    cvData.summary = document.getElementById('input-summary').value;
    renderPreview();
}

// Education Updates
function updateEducation(idx, field, value) { cvData.education[idx][field] = value; renderPreview(); }
function addEducation() { cvData.education.push({ degree: "", dates: "", institution: "" }); renderEditorLists(); renderPreview(); }
function removeEducation(idx) { cvData.education.splice(idx, 1); renderEditorLists(); renderPreview(); }

// Experience Updates
function updateExperience(idx, field, value) { cvData.experience[idx][field] = value; renderPreview(); }
function updateExperienceBullets(idx, value) { cvData.experience[idx].bullets = value.split('\n').filter(b => b.trim() !== ''); renderPreview(); }
function addExperience() { cvData.experience.push({ title: "", dates: "", bullets: [] }); renderEditorLists(); renderPreview(); }
function removeExperience(idx) { cvData.experience.splice(idx, 1); renderEditorLists(); renderPreview(); }

// Strengths Updates
function updateStrength(idx, field, value) { if(cvData.strengths) cvData.strengths[idx][field] = value; renderPreview(); }
function addStrength() { if(!cvData.strengths) cvData.strengths = []; cvData.strengths.push({ name: "", description: "" }); renderEditorLists(); renderPreview(); }
function removeStrength(idx) { if(cvData.strengths) cvData.strengths.splice(idx, 1); renderEditorLists(); renderPreview(); }

// Skills Updates
function updateSkill(idx, field, value) { cvData.skills[idx][field] = value; renderPreview(); }
function addSkill() { cvData.skills.push({ category: "", details: "" }); renderEditorLists(); renderPreview(); }
function removeSkill(idx) { cvData.skills.splice(idx, 1); renderEditorLists(); renderPreview(); }

// Certification Updates
function updateCert(idx, value) { cvData.certifications[idx] = value; renderPreview(); }
function addCert() { cvData.certifications.push(""); renderEditorLists(); renderPreview(); }
function removeCert(idx) { cvData.certifications.splice(idx, 1); renderEditorLists(); renderPreview(); }


// --- EXPORT TO PDF ---
function exportPDF() {
    window.print();
}

// --- EXPORT TO WORD ---
function exportWord() {
    const previewHTML = document.getElementById('cv-preview').innerHTML;

    // Basic styles for Word doc preservation
    const styles = `
        <style>
            body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }
            h1 { text-align: center; font-size: 16pt; margin-bottom: 5px; text-transform: uppercase; }
            .contact-info { text-align: center; font-size: 10pt; margin-bottom: 15pt; }
            h2 { font-size: 12pt; border-bottom: 1px solid #000; padding-bottom: 2pt; margin-top: 15pt; margin-bottom: 8pt; text-transform: uppercase; }
            .job-title { font-weight: bold; }
            .job-dates { float: right; font-style: italic; text-align: right; }
            .job-header { margin-bottom: 4pt; clear: both; overflow: hidden; }
            ul { margin-top: 0; padding-left: 15pt; margin-bottom: 10pt; }
            li { margin-bottom: 3pt; }
            p { margin-top: 3pt; margin-bottom: 10pt; text-align: justify; }
        </style>
    `;

    const documentContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'>${styles}</head>
        <body>${previewHTML}</body>
        </html>
    `;

    const blob = new Blob(['\ufeff', documentContent], {
        type: 'application/msword'
    });
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(documentContent);
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = `${cvData.name.replace(/ /g, '_')}_CV.doc`;
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Initialize App
initEditor();
