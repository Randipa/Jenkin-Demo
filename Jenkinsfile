pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jenkin-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Running tests inside Node.js container...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest"
            }
        }

        stage('Build Info') {
            steps {
                echo 'Pipeline completed successfully!'
                echo "Docker image: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                echo "Branch: ${env.BRANCH_NAME ?: env.GIT_BRANCH}"
                echo "Build Number: ${env.BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo "Image ready: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
        always {
            cleanWs()
        }
    }
}
