pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh '''
                    # Check if Node.js is installed
                    if ! command -v node &> /dev/null; then
                        echo "Node.js is not installed. Installing Node.js 16.x..."
                        curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
                        sudo apt-get install -y nodejs
                    fi
                    
                    # Display Node.js and npm versions
                    node -v
                    npm -v
                    
                    # Install Yarn globally
                    sudo npm install -g yarn
                    
                    # Display Yarn version
                    yarn -v
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