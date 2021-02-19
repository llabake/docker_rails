# Task App

This coding challenge App lets the users add tasks, see the list of tasks and update a task.

## Requirements

#### Ruby

This application uses Ruby version `2.7.1`. To install use `rvm` or `rbenv`.

- RVM

        rvm install 2.7.1
        rvm use 2.7.1

  - To set Ruby `2.7.1` as the default Ruby version for your computer, run

          rvm use 2.7.1 --default

- Rbenv

        rbenv install 2.7.1

  - To switch to `2.7.1` temporarily for this project, use

          rbenv local 2.7.1

  - To use this version as the default Ruby version for your global environment, use

          rbenv global 2.7.1

#### Bundler

Bundler provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed

To install:

        gem install bundler

#### Rails

This applications uses the one of the latest versions of rails. You will need to upgrade if you don't already have it istalled. The rails version being used is `rails 6.0.3.4`.

To install:

        gem install rails

#### Database

This application makes use of the Postgres database for local development

## Installation

To get up and running with the project locally, follow the following steps.

- Clone the app

        git clone https://github.com/llabake/docker_rails.git

- Move into the directory and install all the requirements.

  ```bash
  cd docker_rails/

  bundle install
  ```

- Setup the database

  Run these commands:

        rails db:create
        rails db:migrate
        rails db:seed

- Run the application in the development environment

        rails s

  - Now visit [localhost:3000](http://localhost:3000)
  - A list of task should be displayed
  - Update a task by clicking on the checkbox
  - Add a task by clicking on the `add` sign to the right of the navigation bar. Sample data
    - description - Sample description
    - avatar url - https://loremflickr.com/100/100

- Run Rails Backend test

        bundle exec rspec

- Run React FrontEnd test

        yarn test

- Features

  - List Tasks
  - Add Task
  - Update Tasks

- Author
  Lemboye Labake