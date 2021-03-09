pipeline {
  agent any

  stages {

    stage ("requirements") {
      steps {
        echo "Setting app requirement"
        sh 'gem install bundler -v 2.1.4'
      }

    }

    stage('build') {
      steps {
        echo "installing app dependecies"
        sh 'bundle install'
      }
    }

   stage ("test") {
      steps {
        echo "testing the app"
        sh 'bundle exec rspec
      }

    }

  }

}
