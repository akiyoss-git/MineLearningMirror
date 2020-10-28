npm run build
python manage.py collectstatic --noinput
gunicorn MineLearning.wsgi