pipeline {
    agent any

    environment {
        IMAGE_NAME = 'student-names-app'
        APP_PORT = '8081'
        CONTAINER_NAME = 'student-names-prod'
        TEST_CONTAINER = 'student-names-test'
        TEST_PORT = '8099'
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo "=== Stage 1: Checking out source code from Git ==="
                checkout scm
            }
        }

        stage('Code Validation & Lint') {
            steps {
                echo "=== Stage 2: Validating project structure and assets ==="
                sh '''
                    echo "Checking critical project files..."
                    test -f index.html || (echo "Missing index.html" && exit 1)
                    test -f style.css || (echo "Missing style.css" && exit 1)
                    test -f app.js || (echo "Missing app.js" && exit 1)
                    test -f Dockerfile || (echo "Missing Dockerfile" && exit 1)
                    echo "All core assets verified."
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo "=== Stage 3: Building Docker Container Image ==="
                sh """
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Automated Container Test') {
            steps {
                echo "=== Stage 4: Testing Docker Container in Sandbox ==="
                sh """
                    # Clean up old test container if existing
                    docker rm -f ${TEST_CONTAINER} || true

                    # Run container on temporary test port
                    docker run -d --name ${TEST_CONTAINER} -p ${TEST_PORT}:80 ${IMAGE_NAME}:${BUILD_NUMBER}

                    # Wait for Nginx to initialize
                    sleep 3

                    # Perform HTTP GET request validation
                    HTTP_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${TEST_PORT})
                    echo "Container HTTP Response Code: \${HTTP_STATUS}"
                    
                    if [ "\${HTTP_STATUS}" -ne 200 ]; then
                        echo "Error: Container responded with status \${HTTP_STATUS}"
                        docker logs ${TEST_CONTAINER}
                        docker rm -f ${TEST_CONTAINER}
                        exit 1
                    fi

                    # Verify that student directory content is served
                    curl -s http://localhost:${TEST_PORT} | grep -i "Student Directory System" > /dev/null
                    echo "Webpage title check passed."

                    # Clean up test container
                    docker rm -f ${TEST_CONTAINER}
                    echo "Container test stage passed successfully!"
                """
            }
        }

        stage('Deploy Container') {
            steps {
                echo "=== Stage 5: Deploying Container to Production Environment ==="
                sh """
                    # Stop and remove previous production container if running
                    docker rm -f ${CONTAINER_NAME} || true

                    # Run updated container
                    docker run -d \\
                        --name ${CONTAINER_NAME} \\
                        --restart unless-stopped \\
                        -p ${APP_PORT}:80 \\
                        ${IMAGE_NAME}:${BUILD_NUMBER}

                    echo "Application deployed and accessible at http://localhost:${APP_PORT}"
                """
            }
        }
    }

    post {
        always {
            echo "=== Cleaning up workspace and orphaned test containers ==="
            sh "docker rm -f ${TEST_CONTAINER} || true"
        }
        success {
            echo "=== Jenkins Build #${BUILD_NUMBER} Completed Successfully! ==="
        }
        failure {
            echo "=== Jenkins Build #${BUILD_NUMBER} Failed! ==="
        }
    }
}
