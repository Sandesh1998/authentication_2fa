pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub repository
                git 'https://github.com/Sandesh1998/authentication_2fa.git'
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                // Run Node.js tests
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                // Build your application if necessary
                sh 'npm run build'
            }
        }
    }
}