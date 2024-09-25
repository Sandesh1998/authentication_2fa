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
            sh 'sudo yarn install'
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