pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build Info') {
            steps {
                echo 'Build completed successfully!'
                echo "Branch: ${env.BRANCH_NAME ?: env.GIT_BRANCH}"
                echo "Build Number: ${env.BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
        always {
            cleanWs()
        }
    }
}
