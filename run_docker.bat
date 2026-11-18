@echo off
echo ========================================================
echo  Docker Container Build and Run - Project 14
echo ========================================================

echo 1. Building Docker image: student-names-app:latest...
docker build -t student-names-app:latest .

echo.
echo 2. Removing any existing container with same name...
docker rm -f student-names-container 2>nul

echo.
echo 3. Running Docker container on port 8081...
docker run -d --name student-names-container -p 8081:80 student-names-app:latest

echo.
echo 4. Container status:
docker ps --filter "name=student-names-container"

echo.
echo ========================================================
echo Application is running at http://localhost:8081
echo ========================================================
pause
