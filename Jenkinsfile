pipeline {
  agent any
  stages {
    stage("Build"){
      steps {

        dir("backend"){
            sh "yarn install"
        }
      }
    }
    stage("Test"){
      steps {
        dir("backend"){
            sh "yarn test"
            sh "rm -rf node_modules"
            
        }
      }
    }
     stage("Deploy"){
        steps {
            sh "docker-compose down"
            sh "docker-compose up -d --build"
            sh "docker image prune -f"
        }
      }
  }
}
