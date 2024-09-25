pipeline {
    agent any
    
    environment {
        NODE_VERSION = '16'  // Specify the Node.js version you need
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                // Use nvm to install and use the specified Node.js version
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    
                    # Install yarn globally using npm
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
            // Clean up workspace
            cleanWs()
        }
    }
}