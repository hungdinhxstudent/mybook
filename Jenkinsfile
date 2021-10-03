pipeline {
    agent {
        docker {
            image 'node:16-alpine'
            args '-p 3000:3000'
        }
    }

    stages {
        stage('Build') {
            steps {
                dir('backend') {
                    sh 'yarn install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'yarn test'
                }
            }
        }
        stage('Deliver') {
            steps {
                dir('backend') {
                    sh 'yarn start'
                }
            }
        }
    }
}
