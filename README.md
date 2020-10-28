# MineLearning
# Project requirements or dependence:
  - Django 3.0
  - DRF
  - Simple jwt
  - PostgreSQL
  - React
  - Redux
# Project Deployment
First, let's install the project dependencies, let's start with React:
```sh
$ npm install (with no args, in package dir)
```
Second, install dependencies for python:
```sh
$ pip install -r requirements.txt
```
Ok, we have installed the dependencies, now let's move on to configuring the database and creating a super user:
But before migrations, you must create your database in PostgeSQl and specify its data in settings.py
```sh
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
```
Run project
```sh
$ python manage.py runserver
```