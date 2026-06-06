# CV Builder

An interactive, browser-based CV Builder designed to create, edit, and export professional CVs instantly — no software installation required.

**Live Demo**: [cv-builder.mibot.my.id](https://cv-builder.mibot.my.id)

---

## ✨ Features

- **Dual Template**: Choose between **Classic CV** (ATS-friendly single-column) or **Modern Resume** (creative 2-column with avatar)
- **Photo Upload**: Upload a profile photo — displayed as a circular avatar in both Classic and Modern templates
- **Real-Time Preview**: Changes in the Editor panel (left) are instantly reflected in the A4 Preview panel (right)
- **Markdown-like Syntax**: Use `**bold**` or `*bold*` for bold text. Press `Enter` for new paragraphs/bullet points
- **Dynamic Sections**: Add or remove Education, Work Experience, Skills, Strengths, and Certifications entries on the fly
- **Export to PDF**: One-click export using browser Print (optimized for A4 paper with proper margins)
- **Export to Word**: Download as `.doc` file for editable document sharing
- **Single Page A4**: Classic template is optimized to fit all content on a single A4 page
- **Zero Dependencies**: 100% Vanilla HTML + CSS + JavaScript — no frameworks, no build tools

---

## 📁 Project Structure

```
cv-builder/
├── index.html              # Main application entry point
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles (Classic + Modern themes, editor, print)
│   └── js/
│       ├── data.js          # Default CV data (editable template)
│       └── main.js          # Application logic (rendering, export, photo upload)
└── README.md
```

---

## 🚀 Quick Start (Local)

1. Clone the repository:
   ```bash
   git clone https://github.com/fahroediin/cv-builder.git
   cd cv-builder
   ```

2. Open `index.html` in your browser:
   ```bash
   # Option 1: Direct open
   open index.html          # macOS
   start index.html         # Windows
   xdg-open index.html      # Linux

   # Option 2: Local HTTP server
   python3 -m http.server 8080
   # Then open http://localhost:8080
   ```

3. Select a template (Classic or Modern), fill in your data, and export!

---

## 🖥️ Deploy on AlmaLinux VPS with PM2

### Prerequisites

- AlmaLinux 8/9 VPS with root or sudo access
- Domain pointed to your VPS IP (e.g. `cv-builder.yourdomain.com`)

### Step 1: Install Node.js & PM2

```bash
# Install Node.js (LTS) via NodeSource
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

### Step 2: Install & Configure Nginx

```bash
# Install Nginx
sudo dnf install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Open firewall ports
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### Step 3: Clone & Setup Project

```bash
# Create project directory
sudo mkdir -p /var/www/cv-builder
cd /var/www/cv-builder

# Clone repository
sudo git clone https://github.com/fahroediin/cv-builder.git .

# Set proper ownership
sudo chown -R nginx:nginx /var/www/cv-builder
```

### Step 4: Create Static File Server

Since this is a static HTML app, we use a lightweight Node.js HTTP server:

```bash
# Install serve (lightweight static file server)
sudo npm install -g serve
```

### Step 5: Start with PM2

```bash
# Start the static server on port 3500
pm2 start serve --name "cv-builder" -- -s /var/www/cv-builder -l 3500 --no-clipboard

# Save PM2 process list
pm2 save

# Enable PM2 to start on boot
pm2 startup systemd
# Follow the output command (copy-paste and run it)

# Verify it's running
pm2 status
```

### Step 6: Configure Nginx Reverse Proxy

Create the Nginx config:

```bash
sudo nano /etc/nginx/conf.d/cv-builder.conf
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name cv-builder.yourdomain.com;  # Replace with your domain

    location / {
        proxy_pass http://127.0.0.1:3500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Enable HTTPS with Certbot (Optional but Recommended)

```bash
# Install Certbot
sudo dnf install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d cv-builder.yourdomain.com

# Auto-renewal is configured automatically
# Verify with:
sudo certbot renew --dry-run
```

---

## 🔧 PM2 Useful Commands

| Command | Description |
|---|---|
| `pm2 status` | Check running processes |
| `pm2 logs cv-builder` | View application logs |
| `pm2 restart cv-builder` | Restart the application |
| `pm2 stop cv-builder` | Stop the application |
| `pm2 delete cv-builder` | Remove from PM2 process list |
| `pm2 monit` | Real-time monitoring dashboard |

---

## 🔄 Update Deployment

To pull the latest changes on your VPS:

```bash
cd /var/www/cv-builder
sudo git pull origin main
pm2 restart cv-builder
```

---

## 🛠️ Customization

- **Colors & Fonts**: Edit `assets/css/styles.css` — Classic theme styles start at `.theme-classic`, Modern theme at `.theme-modern`
- **Default Data**: Edit `assets/js/data.js` to change the pre-filled template data
- **Layout & Logic**: Edit `assets/js/main.js` for rendering logic and export functions

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

Built with ❤️ by [Imam Fahrudin](https://linkedin.com/in/fahroedin)
