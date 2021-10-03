/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker {
            image 'node:16-alpine'
            args '-p 9000:9000'
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
                    sh 'yarn global add pm2'
                    sh 'pm2 start main.js'
                }
            }
        }
    }
}
