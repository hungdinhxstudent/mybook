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
                sh 'chmod +x start.sh end.sh'
                sh './start.sh'
                sh './end.sh'
            }
        }
    }
}
