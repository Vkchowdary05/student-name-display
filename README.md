# Project 14: Student Names Display

> **DevOps External Exam / Lab Assignment**
> - **14.a:** Write a program to store and display the names of five students. Use Git and GitHub to manage the program source code.
> - **14.b:** Create and run a Docker container and configure Jenkins to execute the build process.

---

## 1. Project Overview & Features
- **Frontend Program:** Web application built with HTML5, modern CSS3 (shadcn-inspired monochrome theme), and Vanilla JavaScript.
- **Data Storage:** Stores five student records in structured array/state with ID, Name, Roll Number, Course, and Status.
- **Interactive Features:** Real-time search/filter, dynamic add student drawer, and reset functionality.
- **CLI Alternative:** Standalone `students.py` script to display the five students in terminal environments.
- **Containerization:** Lightweight `Dockerfile` using `nginx:alpine` and `docker-compose.yml`.
- **CI/CD Automation:** Comprehensive declarative `Jenkinsfile` pipeline that builds, tests, and deploys the container automatically.

---

## 2. Project Structure
```text
14-student-names-display/
├── index.html              # Main student directory web interface
├── style.css               # Minimalist monochrome dark stylesheet
├── app.js                  # JavaScript logic for storing & rendering 5 students
├── students.py             # CLI program to display the 5 students in terminal
├── Dockerfile              # Docker container specification (Nginx Alpine)
├── docker-compose.yml      # Docker Compose configuration (Port 8081:80)
├── Jenkinsfile             # Jenkins Declarative CI/CD Pipeline
├── run_docker.bat          # 1-click Windows batch script to build & run Docker
├── setup_git.bat           # Automated Git repository initialization script
├── .dockerignore           # Files excluded from Docker image
├── .gitignore              # Files ignored by Git
└── README.md               # Complete lab documentation and Jenkins guide
```

---

## 3. The 5 Stored Students
The application initializes with the following 5 student records:
1. **Alexander Wright** - Roll No: `DEV-2024-001` - Course: *DevOps & Cloud*
2. **Beatrice Chen** - Roll No: `DEV-2024-002` - Course: *Site Reliability*
3. **Clara Oswald** - Roll No: `DEV-2024-003` - Course: *CI/CD Engineering*
4. **David Kumar** - Roll No: `DEV-2024-004` - Course: *Container Security*
5. **Elena Rostova** - Roll No: `DEV-2024-005` - Course: *Kubernetes Admin*

---

## 4. Source Code Management with Git and GitHub (14.a)

### Step 1: Initialize Git Repository
Run the automated script `setup_git.bat` or run:
```bash
git init
git add .
git commit -m "feat: initial commit for Project 14 Student Names Display"
```

### Step 2: Push to GitHub
1. Create a repository on GitHub named `student-names-display`.
2. Link your local repository:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/student-names-display.git
git push -u origin main
```

---

## 5. Local Execution
- **Web Interface:** Open `index.html` in your browser or run:
  ```bash
  python -m http.server 8000
  ```
  Visit [http://localhost:8000](http://localhost:8000).
- **CLI Terminal Program:**
  ```bash
  python students.py
  ```

---

## 6. Docker Container Execution (14.b)

### Option A: Using Docker CLI
```bash
# 1. Build the Docker image
docker build -t student-names-app:latest .

# 2. Run the container on port 8081
docker run -d --name student-names-container -p 8081:80 student-names-app:latest

# 3. Check container status
docker ps
```
Visit the running container at: [http://localhost:8081](http://localhost:8081)

To stop the container:
```bash
docker stop student-names-container && docker rm student-names-container
```

### Option B: Using Docker Compose
```bash
docker compose up -d --build
```

---

## 7. Configuring Jenkins to Execute Build Process (14.b)

### Step 1: Jenkins Prerequisites
1. Ensure **Jenkins** is installed and running (default: `http://localhost:8080`).
2. Ensure the following Jenkins plugins are installed under **Manage Jenkins > Plugins**:
   - *Git Plugin*
   - *Pipeline Plugin*
   - *Docker Pipeline Plugin*
3. Ensure the Jenkins service user has permissions to run `docker` commands.

### Step 2: Create a Jenkins Pipeline Job
1. Open Jenkins dashboard and click **New Item**.
2. Enter item name: `Student-Names-CI-Build`.
3. Select **Pipeline** and click **OK**.

### Step 3: Configure Pipeline SCM
Under the **Pipeline** configuration section:
1. **Definition:** Select `Pipeline script from SCM`.
2. **SCM:** Select `Git`.
3. **Repository URL:** Enter your GitHub repository URL:
   `https://github.com/<YOUR_USERNAME>/student-names-display.git`
4. **Branch Specifier:** `*/main`
5. **Script Path:** `Jenkinsfile`
6. Click **Save**.

### Step 4: Run the Build
1. Click **Build Now** on the left menu.
2. Observe the stage pipeline execution:
   - **Stage 1 (Checkout Source):** Pulls the repository from GitHub.
   - **Stage 2 (Code Validation & Lint):** Verifies all core files exist.
   - **Stage 3 (Docker Build):** Executes `docker build -t student-names-app:${BUILD_NUMBER} .`.
   - **Stage 4 (Automated Container Test):** Runs container on port `8099`, curls endpoint, checks HTTP 200 and student content.
   - **Stage 5 (Deploy Container):** Runs the updated container on port `8081`.
3. Click on the build number and select **Console Output** to verify all stages completed with `SUCCESS`.
