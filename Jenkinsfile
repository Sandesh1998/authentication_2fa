pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
       stage("Test"){
        steps {
            sh 'sudo apt install yarn'
            sh 'yarn test'
        }
       }

         stage("Build"){
          steps {
                sh 'sudo yarn build'
          }
         }
    }  
}