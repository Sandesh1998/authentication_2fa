pipeline {
    agent any
    
    tools {
        nodejs 'Node 16'  // Make sure this matches a NodeJS installation name in your Jenkins configuration
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm install -g yarn
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}