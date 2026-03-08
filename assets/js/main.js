// --- RENDER FUNCTIONS ---

// Populate inputs initially
function initEditor() {
    document.getElementById('input-name').value = cvData.name;
    document.getElementById('input-contact').value = cvData.contact;
    document.getElementById('input-summary').value = cvData.summary;

    renderEditorLists();
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

// --- UPDATE HANDLERS ---
function updateCV() {
    cvData.name = document.getElementById('input-name').value;
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
