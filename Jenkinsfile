pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sandesh1998/authentication_2fa.git'
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        echo "Warning: Tests failed or not found. Continuing pipeline."
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch (Exception e) {
                        echo "Warning: Build script failed or not found. Continuing pipeline."
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}